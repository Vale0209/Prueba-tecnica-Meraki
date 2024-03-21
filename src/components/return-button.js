import { LitElement, html, css } from 'lit';

export class ReturnButton extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html `
      .close {
        position: absolute;
        top: -0.8em;
        right: 0.5em;
        font-size: 1.1em;
        cursor: pointer;
      }
    `;
  }

  render() {
    return html `
      <p class="close" @click="${ this.return }">✖</p>    
    `;
  };

  return() {
    location.href = "/";
  };
}
customElements.define('return-button', ReturnButton);
