import { LitElement, html, css } from 'lit';
import { firstLastInitialName, isCompany } from '../utils';

export class AvatarIcon extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.1em;
      }
    `
  ];

  generateRandomColor() {
    const hue = Math.random() * 360;
    const saturation = 70 + Math.random() * 30;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  static get properties() {
    return {
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.backgroundColor = this.generateRandomColor();
  }

  render() {
    this.style.backgroundColor = this.backgroundColor;

    return html `
      <div class="avatar">${ isCompany(this.name) ? "🏢" :  firstLastInitialName(this.name) }</div>
    `;
  }
}
customElements.define('avatar-icon', AvatarIcon);
