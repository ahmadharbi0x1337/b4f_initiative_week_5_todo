// Note: FormData uses the name attribute on the input element not the id
export const getFormData = (formElement) => {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
};

export const hideBSModal = (id) => {
  const modal = document.getElementById(id);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  if (modalInstance) {
    modalInstance.hide();
  }
};

// by default the type is button and there is a class called btn
export const CustomBtn = (name = "", id = "", classes = "", attrs = "") => {
  return `
  <button type="button" class="btn ${classes}" id=${id} data-action=${name.toUpperCase()} ${attrs}>${name}</button>
  `;
};

// el is an element with multiple direct childs inside it and we want to add event listeners to all of them
// console.log(el instanceof HTMLElement); // output true
export const addListenersToChildren = (
  el = HTMLElement,
  callBack = async () => {},
) => {
  // assume that el.children returns an HTMLCollection which is an array of Elements
  const children = Array.from(el.children);
  children.forEach((child) => {
    child.addEventListener("click", async (e) => {
      callBack(e);
    });
  });
};
