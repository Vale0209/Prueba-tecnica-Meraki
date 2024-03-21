import Http from '../http';

const path = '/accionistas';

const http = new Http(path);

export const getAccionistasData = async () => await http.get();

export const getAccionistasById = async (id) => await http.getByID(id);

export const updateAccionistasById = async (id, data) => await http.updateByID(id, data);

export const getAccionistasByNIT = async (data) => await http.getByQuery("?NIT=", data);