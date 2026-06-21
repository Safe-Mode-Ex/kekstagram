const render = (containerEl, renderCb, itemsToRender = [''], rewrite = false, rewriteElementSelector = null) => {
  const fragment = document.createDocumentFragment();

  itemsToRender?.forEach((item) => {
    const itemEl = renderCb(item);
    fragment.appendChild(itemEl);
  });

  if (rewrite && rewriteElementSelector) {
    const elementsToRemove = containerEl.querySelectorAll(rewriteElementSelector);
    for (const element of elementsToRemove) {
      element.remove();
    }
  } else if (rewrite) {
    containerEl.innerHTML = '';
  }

  containerEl.appendChild(fragment);
};

export {render};
