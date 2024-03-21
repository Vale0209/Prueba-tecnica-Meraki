import { LitElement, html, css } from 'lit';
import { getAccionistasById } from '../actions/accionistas.action';
import { isCompany } from '../utils';
import '../components/return-button';
import  '../components/accionista-composition';

export class AccionistaPage extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      h1 {
        font-size: 0.8em;
        text-align: center;
        font-weight: 300;
      }

      fieldset {
        display: flex;
        flex-direction: column;
        gap: 0.8em;
      }

      fieldset > div {
        display: flex;
        flex-direction: column;
        background-color: lightgray;
      }

      input,
      select {
        border: none;
        outline: none;
        background-color: lightgray;
        border-bottom: 1px solid black;
      }

      .percentage {
        flex-wrap: wrap;
      }

      .percentage > input {
        display: inline-block;
        width: 50%;
        color: red;
      }

      form {
        display: flex;
        flex-direction: column;
        alig-items: center;
      }

      button {
        margin: 0 auto;
        padding: 0.5em 2em;
        border: none;
        cursor: pointer;
        color: white;
        background-color: steelblue;
      }
    `,
  ];

  static get properties() {
    return {
      id: { type: String, attribute: false },
      nombre: { type: String, attribute: false },
      documento: { type: String, attribute: false },
      porcentaje: { type: String, attribute: false },
      tipoDocumento: { type: String, attribute: false },
      nit: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.getIdUser();
  }

  render() {
    return html`
      <return-button></return-button>
      ${this.titlePage(this.nombre)}
      <avatar-icon name="${this.nombre}"></avatar-icon>
      <h2>${this.nombre}</h2>
      <form id="form" @submit="${this.handleSubmit}">
        <fieldset>
          <legend>Información sobre el miembro</legend>
          <div>
            <label for="docType">Tipo de documento</label>
            <select id="docType" name="docType">
              ${this.selectField(this.tipoDocumento)}
            </select>
          </div>
          <div>
            <label for="id">Numero de identificación</label>
            <input id="id" name="id" type="number" value="${this.documento}" />
          </div>
          ${this.nameFormField(this.nombre)}
          <div class="percentage">
            <label for="percentage">Porcentaje de participación</label>
            <span>
              <input
                id="percentage"
                name="percentage"
                type="number"
                value="${+this.porcentaje}"
              />
              %
            </span>
          </div>
        </fieldset>
        ${isCompany(this.nombre)
          ? html`<accionista-composition
              nit="${JSON.stringify(this.nit)}"
            ></accionista-composition>`
          : this.policyPEPField()}
        <button type="submit">Salir</button>
      </form>
    `;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = this.shadowRoot?.getElementById("form");  
    const formData = new FormData(form);
    const values = Object.fromEntries(formData);

    const dataToSend = {
      Nombre: "",
      TipoDocumento: "",
      Documento: 0,
      Porcentaje: ""
    };

    dataToSend["TipoDocumento"] = values.docType;
    dataToSend["Documento"] = values.id;
    dataToSend["Porcentaje"] = values.percentage+"%";

    if(values.companyName){
      dataToSend["Nombre"] = values.companyName;
    } else {
      dataToSend["Nombre"] = values.name + " " + values.lastName;
    };

    const rest = await getAccionistasById(values.id); 
    
    if((values.pep) == "Si") {
      location.href = "/actualizacion-de-datos";
      console.log("yes", values.pep);
    } else {
      console.log("No", values.pep);
    };

    if(
      dataToSend.Nombre==rest.Nombre &&
      dataToSend.TipoDocumento==rest.TipoDocumento &&
      dataToSend.Documento==rest.Documento &&
      dataToSend.Porcentaje==rest.Porcentaje
    ) {
      if((values.pep) == "Si") {
        return location.href = "/actualizacion-de-datos";
      } 

      return location.href = "/";    
    };
      
    this.updateAccionista(dataToSend, values.pep == "Si");
  };

  async getIdUser() {
    const id = location.pathname.split('accionista')[1].replace('/', '');
    this.id = id;
    try {
      const accionista = await getAccionistasById(id);
      this.accionista = accionista;

      let { Nombre, Documento, Porcentaje, TipoDocumento, NIT } = this.accionista;

      this.nombre = Nombre;
      this.documento = Documento;
      this.porcentaje = Porcentaje.split("%")[0];
      this.tipoDocumento = TipoDocumento;
      this.nit = NIT;      
    } catch (err) {
      console.error(err);
    }
  }

  titlePage(name = '') {
    if(isCompany(name)) return html `<h1>Accionista</h1>`;

    return html `<h1>Composición del accionista</h1>`;
  };

  selectField(docType = '') {
    if(docType == "CC") return html `
      <option value="NIT">NIT</option>
      <option selected value="CC">Cedula</option>      
    `;

    return html `
      <option selected value="NIT">NIT</option>
      <option value="CC">Cedula</option>
    `;
  }

  nameFormField(name = '') {
    if(isCompany(name)) return html `
    <div>
      <label for="companyName">Razón social</label>
      <input id="companyName" name="companyName" type="text" value="${ name }" />
    </div>
    `;

    return html `
    <div>
      <label for="name">Nombre</label>
      <input id="name" name="name" type="text" value="${ name.split(" ")[0] }" />
    </div>
    <div>
      <label for="lastName">Apellido</label>
      <input id="lastName" name="lastName" type="text" value="${ name.split(" ")[1] }" />
    </div>
    `;
  };

  policyPEPField() {
    return html `
    <h5>PERSONAS ESPUESTAS POLITICAMENTE (PEP)</h5>
    <p>
      ¿Es una persona expuesta politicamente (PEP), está relacionada, asociada, o es familiar de una?
    </p>
    <div>
      <label for="pepYes">Si</label>
      <input type="radio" id="pepYes" name="pep" value="Si">
      <label for="pepNo">No</label>
      <input type="radio" id="pepNo" name="pep" value="No" checked>
    </div>
    `;
  };
}
customElements.define('accionista-page', AccionistaPage);
