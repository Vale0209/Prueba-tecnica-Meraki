import { LitElement, html, css } from 'lit';

export class ReminderInfo extends LitElement {
  static styles = [
    css`
      :host {
        display:block;
        background-color: steelblue;
        text-align:center;
        padding: 1em;
        margin: 1em;
      }
    `
  ];

  render() {
    return html `
      <h1>❕</h1>
      <p>Recuerda que si deseas actualizar la información de los accionistas, deberas dirigirte a tu oficina o canal web</p>
    `;
  }
}
customElements.define('reminder-info', ReminderInfo);
