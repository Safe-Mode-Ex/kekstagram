const render = (containerEl, itemsToRender, renderCb, rewrite = false) => {
  const fragment = document.createDocumentFragment();

  itemsToRender.forEach((item) => {
    const itemEl = renderCb(item);
    fragment.appendChild(itemEl);
  });

  if (rewrite) {
    containerEl.innerHTML = '';
  }

  containerEl.appendChild(fragment);
};

export {render};
