export function getDataFromLocalByKey(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setItemWithLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function setItemWithSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getElementValueById(id) {
  return document.getElementById(id).value;
}
