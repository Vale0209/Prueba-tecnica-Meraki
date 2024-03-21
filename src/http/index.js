export default class Http {
  constructor(path) {
    this.baseURL = "http://localhost:3000";
    this.path = path;
  }

  async get() {
    try {
      const data = await fetch(this.baseURL + this.path);
      return data.json();
    } catch (err) {
      console.error(err);
    }
  }

  async getByID(id) {
    try {
      const data = await fetch(this.baseURL + this.path + "/" + id);
      return data.json();
    } catch (err) {
      console.error(err);
    }
  }

  async getByQuery(query, id) {
    try {
      const data = await fetch(this.baseURL + this.path + query + id);
      return data.json();
    } catch (err) {
      console.error(err);
    }
  }

  async updateByID(id, dataToSend) {
    try {
      const data = await fetch(this.baseURL + this.path + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      console.log("Completed");

      return data.json();
    } catch (err) {
      console.error(err);
    }
  }
};