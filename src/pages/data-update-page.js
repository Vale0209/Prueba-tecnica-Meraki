import { LitElement, html, css } from 'lit';

export class DataUpdatePage extends LitElement {
  static styles = [
    css`
      :host {
        display:block;
        width: 100%;
        min-height: 100vh;
        text-align: center;
      }
      
      h1 {
        color: white;
        background-color: steelblue;
        padding: 1em;
        font-size: 0.8em;
      }

      .info {
        min-height:90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      button {
        color: white;
        background-color: steelblue;
        border: none;
        padding: 0.5em 2em;
        cursor: pointer;
      }
    `
  ];



  render() {
    return html `
      <h1>Actualización de datos</h1>
      <div class="info">
        <p>🏦</p>
        <h4>Es necesario que vayas a una oficina</h4>
        <p>Acercate a una oficina para validar tu información y continuar con tu solicitud.</p>
        <button @click="${ this.redirectHome }">Salir</button>
      </div>
    `;
  }

  redirectHome() {
    location.href = '/';
  };
}
customElements.define('data-update-page', DataUpdatePage);
