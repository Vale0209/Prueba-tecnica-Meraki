import { LitElement, html, css } from 'lit';

import './pages/not-found';
import './pages/home-page';
import './pages/accionista-page';
import './pages/data-update-page';
export class MyApp extends LitElement {
    static styles = css `
    h1 {
      text-align:center;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2em;
      border: 1px solid black;
      padding: 1rem;
    }

    li {
      list-style: none;
    }
    
    a {
      text-decoration: none;
    }

    a:visited {
      color: crimson;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

    static get properties() {
        return {
            paths: { type: Array },
        };
    }

    constructor() {
        super();
        this.paths = [
            {
              path: "/",
              component: html `<home-page></home-page>`,
              regex: /^(\/|\/[\w\-]+\/)$/
            },
            {
              path: "/home",
              component: html `<home-page></home-page>`,
              regex: /home/i
            },
            {
              path: "/accionista",
              component: html `<accionista-page></accionista-page>`,
              regex: /accionista/i
            },
            {
              path: "/actualizacion-de-datos",
              component: html `<data-update-page></data-update-page>`,
              regex: /actualizacion-de-datos/i
            }
        ];
    };

    currentPage() {
        const { pathname } = location;

        for(let path of this.paths) {
          if (!path.regex?.test(pathname)){
            continue;
          } else {
            return path.component;
          };
        };
    
        return html `<not-found></not-found>`;    
      };

    render() {
        return html `
          ${ this.currentPage() }
        `;
    };

}
customElements.define('my-app', MyApp);
