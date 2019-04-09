export class Component extends HTMLElement {
  html = document.createElement('template');

  constructor(template) {
    super();
    this.html.innerHTML = template;
  }

  /**
   * Helper function to retreive a single element from the shadowroot
   * @param {string} selector
   */
  query(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  queryAll(selector) {
    return this.shadowRoot && this.shadowRoot.querySelectorAll(selector);
  }

  connectedCallback() {
    window.ShadyCSS && window.ShadyCSS.styleElement(this);
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(this.html.content.cloneNode(true))
    }
  }
}