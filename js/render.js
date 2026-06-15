const render = (containerSelector, itemsToRender, renderCb) => {
  const containerEl = document.querySelector(containerSelector);
  const fragment = document.createDocumentFragment();

  itemsToRender.forEach((item) => {
    const itemEl = renderCb(item);
    fragment.appendChild(itemEl);
  });

  containerEl.appendChild(fragment);
};

export {render};
