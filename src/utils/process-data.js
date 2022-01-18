export function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("userdata")) || [];
}

export function getDataFromLocalByKey(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setItemWithLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function setItemWithSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
