const render = (containerEl, itemsToRender, renderCb) => {
  const fragment = document.createDocumentFragment();

  itemsToRender.forEach((item) => {
    const itemEl = renderCb(item);
    fragment.appendChild(itemEl);
  });

  containerEl.appendChild(fragment);
};

export {render};
