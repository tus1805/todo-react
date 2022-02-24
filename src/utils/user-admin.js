export function enableForm() {
  const form = document.getElementById("signUpAdminForm");
  const elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
}

export function disableForm() {
  const form = document.getElementById("signUpAdminForm");
  const elements = form?.elements;
  for (var i = 0, len = elements?.length; i < len; ++i) {
    elements[i].disabled = true;
  }
}
