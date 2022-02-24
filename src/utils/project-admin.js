export function showTableControl() {
  console.log(localStorage.getItem("projectId"));
  if (!localStorage.getItem("projectId")) {
    document.querySelector(".todo-list:nth-child(2)").style.display = "none";
    document.querySelector(".todo-list:nth-child(3)").style.display = "none";
  } else {
    document.querySelector(".todo-list:nth-child(2)").style.display = "block";
    document.querySelector(".todo-list:nth-child(3)").style.display = "block";
  }
}
