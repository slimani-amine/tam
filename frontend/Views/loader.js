// loader.js
export const loader = () => {
  const loaderElement = document.createElement('div');
  loaderElement.innerHTML = `<div id="loader" class="loadContent">
      <div class="ball red"></div>
      <div class="ball green"></div>
      <div class="ball yellow"></div>
      <div class="ball blue"></div>
      <div class="ball emerald-green"></div>
      <div class="ball pink"></div>
  </div>`;
  document.body.appendChild(loaderElement);
};

export const removeLoader = () => {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
      loaderElement.remove();
  }
};
