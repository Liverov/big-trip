import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforened`
};

// Вставляем элемент child в начало/конец(place) в container
export const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child); // Вставить child в конец container
      break;
    case RenderPosition.BEFOREEND:
      container.append(child); // Вставить child в начало container
      break;
  }
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`); // Создаем div
  newElement.innerHTML = template; // Записываем в него template элемент
  return newElement.firstChild; // Выводим первый узел(firstChild) из узла newElement
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement; // Создаем ссылку на родительский элемент(parentElement) oldChild

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild); // Заменяем oldChild на newChild среди дочерних элементов parent
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};
