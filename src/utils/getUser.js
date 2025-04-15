export function getUser() {
  let user = JSON.parse(localStorage.getItem("toDoAppUser"));
  return user;
}
