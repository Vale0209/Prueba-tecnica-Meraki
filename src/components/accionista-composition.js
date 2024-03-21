import { LitElement, html, css } from 'lit';
import { getAccionistasByNIT } from '../actions/accionistas.action';

export class AccionistaComposition extends LitElement {
  static styles = [
    css`
      h2 {
        font-size: 1em;
      }
    `
  ];

  static get properties() {
    return {
      nit: { type: String },
      accionistas: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.accionistas = [];
    let counter = 1; 

    const interval = setInterval(()=>{
      counter++;

      this.getAccionistasData(JSON.parse(this.nit));

      if(counter > 1) {
        clearInterval(interval);
      };
    },1000);
  }

  render() {
    return html `
      <h2>Composicion del accionista</h2>
      ${ this.accionistas.map(accionista => html `<accionista-card accionista="${ JSON.stringify(accionista) }"></accionista-card>`) }      
    `;
  }

  async getAccionistasData(nit = '') {

    const currentId = location.pathname.split("/")[2];

    try {
      const data = await getAccionistasByNIT(nit);
      this.accionistas = data?.filter(accionista => accionista.Documento !== +currentId);
    } catch(err) {
      console.error(err);
    };
  };
}
customElements.define('accionista-composition', AccionistaComposition);
