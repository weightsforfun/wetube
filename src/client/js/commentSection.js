import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const delete_buttons = document.getElementsByClassName(
  "video_comment_delete_button"
);

const addComment = (text, id, user) => {
  const videoComments = document.querySelector(".video_comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video_comment";
  const span_text = document.createElement("span");
  const span_bar = document.createElement("span");
  const span_name = document.createElement("span");
  const button_delete = document.createElement("button");
  button_delete.dataset.id = id;
  button_delete.dataset.owner = user._id;
  button_delete.innerText = `❌`;
  span_text.innerText = ` ${text}`;
  span_bar.innerText = " : ";
  span_name.innerText = ` ${user.username}`;
  newComment.appendChild(span_name);
  newComment.appendChild(span_bar);
  newComment.appendChild(span_text);
  newComment.appendChild(button_delete);
  videoComments.prepend(newComment);
  button_delete.addEventListener("click", handleDeleteButton);
};

const deleteComment = (target) => {
  target.parentNode.remove();
};

const handleAddButton = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId, user } = await response.json();
    addComment(text, newCommentId, user);
    textarea.value = "";
  }
};

const handleDeleteButton = async (event) => {
  event.preventDefault();
  const comment_id = event.target.dataset.id;
  const comment_owner_id = event.target.dataset.owner;
  const response = await fetch(`/api/comment/${comment_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment_owner_id }),
  });
  if (response.status === 201) {
    deleteComment(event.target);
  }
};

if (form) {
  form.addEventListener("submit", handleAddButton);
}

Array.from(delete_buttons).forEach((element) => {
  element.addEventListener("click", handleDeleteButton);
});
