import { LitElement, html, css } from 'lit';
import './avatar-icon';

export class AccionistaCard extends LitElement {
  static styles = [
    css`
      a {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 1em;
        border-bottom: 1px solid lightgray;
        margin: 0 1em;
        text-decoration: none;
        color: black;
      }

      .avatar {
        background-color: steelblue;
        width: 120px;
      }

      .person {
        font-style: italic;
      }
      
      .person .person--name {
        font-style: normal;
        color: steelblue;
      }
      
      .person .person--percentage {
        color: green;
      }
    `
  ];

  static get properties() {
    return {
      accionista: { type: String },
    };
  }

  render() {
    const accionista = JSON.parse(this.accionista);

    return html `
      <a href="/accionista/${ accionista.Documento }">
        <avatar-icon name="${ accionista.Nombre }"></avatar-icon>
        <div class="person">
          <p class="person--name">${ accionista.Nombre }</p>
          <p>${ accionista.TipoDocumento } ${ accionista.Documento }</p>
          ${ accionista.CantidadAccionitas && accionista.CantidadAccionitas+" accionistas" }
          <p class="person--percentage">Participación: ${ accionista.Porcentaje }</p>
        </div>
      </a>
    `;
  }
}
customElements.define('accionista-card', AccionistaCard);
