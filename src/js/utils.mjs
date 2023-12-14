export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderTemplateList(element, list, where="beforeend", templateFunction, clear=true){
    list.forEach((product) => {
        element.insertAdjacentHTML(where, templateFunction(product));
    })
  }
  
export async function renderTemplate(element, where="beforeend", templateFunction, clear=true){
    if (clear) {
        element.innerHTML = "";
    }
    element.insertAdjacentHTML(where, templateFunction);
}

async function loadTemplate(fullPath) {
  return new Promise(async (resolve, reject) => {
      const res = await fetch(fullPath); // Make an HTTP request using fetch
      if (res.ok) {
          const html = await res.text();
          resolve(html);
      } else {
          reject(new Error(`Error loading template: ${fullPath}`));
      }
  });
}

  
  export async function loadHeaderFooter(){
    const footerTemplateFn = await loadTemplate("public/partials/footer.html");

    const footerelement = document.getElementById("main-footer");
    renderTemplate(footerelement, "beforeend", footerTemplateFn);
  }

