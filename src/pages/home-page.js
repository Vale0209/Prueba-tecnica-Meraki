import { LitElement, html, css } from 'lit';
import { getAccionistasData } from '../actions/accionistas.action';
import '../components/accionista-card';
import '../components/reminder-info';

export class HomePage extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        font-size: 0.8rem;      
      }

      h1 {
        font-size: 1.2em;
      }

      button {
        margin: 0 auto;
        padding: 0.5em 1.5em;
        border: none;
        background-color: steelblue;
        color: white;
        cursor: pointer;
      }
    `
  ];

  static get properties() {
    return {
      accionistas: { type: Array, attribute: false }
    };
  }

  constructor() {
    super();

    this.getAccionistasData();
  }

  header() {
    return html `
      <h1>
        ACCIONISTAS
        <span>(2 of 3)</span>
      </h1>  
    `;
  }

  description() {
    return html `
    <strong>
      Esta es la informacion sobre los accionistas de tu empresa.
    </strong>
    `
  };

  render() {

    return html `
      ${ this.header() }
      ${ this.description() }
      ${ this.accionistas?.map((accionista)=>
        html `<accionista-card accionista="${ JSON.stringify(accionista) }"></accionista-card>`)
      }
      <reminder-info></reminder-info>
      <button>Continuar</button>
    `;
  };

  async getAccionistasData () {
    try {
      const data = await getAccionistasData();
      this.accionistas = data;
    } catch (err) {
      console.error(err);
    };
  }
}
customElements.define('home-page', HomePage);
