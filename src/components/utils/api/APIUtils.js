import { API_BASE_URL, ACCESS_TOKEN } from "../constants/index";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getAllMissions() {
  return request({
    url: API_BASE_URL + "/api/missions",
    method: "GET",
  });
}

export function getMissionById(id) {
  return request({
    url: API_BASE_URL + "/api/missions/" + id,
    method: "GET",
  });
}

export function createMission(mission) {
  return request({
    url: API_BASE_URL + "/api/missions",
    method: "POST",
    body: JSON.stringify(mission),
  });
}

export function updateMission(id, mission) {
  return request({
    url: API_BASE_URL + "/api/missions/" + id,
    method: "PUT",
    body: JSON.stringify(mission),
  });
}

export function deleteMission(id) {
  return request({
    url: API_BASE_URL + "/api/missions/" + id,
    method: "DELETE",
  });
}
// apiUtils.js

// ...

// Agendas
export function getAllAgendas() {
  return request({
    url: API_BASE_URL + "/api/agendas",
    method: "GET",
  });
}

export function createAgenda(agendaData) {
  return request({
    url: API_BASE_URL + "/api/agendas",
    method: "POST",
    body: JSON.stringify(agendaData),
  });
}

export function updateAgenda(agendaId, agendaData) {
  return request({
    url: API_BASE_URL + "/api/agendas/" + agendaId,
    method: "PUT",
    body: JSON.stringify(agendaData),
  });
}

export function deleteAgenda(agendaId) {
  return request({
    url: API_BASE_URL + "/api/agendas/" + agendaId,
    method: "DELETE",
    // body: JSON.stringify(agendaId),
  });
}

// Facturations
export function getAllFacturations() {
  return request({
    url: API_BASE_URL + "/api/facturations",
    method: "GET",
  });
}

export function getFacturationById(id) {
  return request({
    url: API_BASE_URL + "/api/facturations/" + id,
    method: "GET",
  });
}

export function getFacturationByMissionId(id) {
  return request({
    url: API_BASE_URL + "/api/facturations/mission/" + id,
    method: "GET",
  });
}

export function createFacturation(facturationData) {
  return request({
    url: API_BASE_URL + "/facturations",
    method: "POST",
    body: JSON.stringify(facturationData),
  });
}

export function updateFacturation(facturationId, facturationData) {
  return request({
    url: API_BASE_URL + "/facturations/" + facturationId,
    method: "PUT",
    body: JSON.stringify(facturationData),
  });
}

export function deleteFacturation(facturationId) {
  return request({
    url: API_BASE_URL + "/facturations/" + facturationId,
    method: "DELETE",
  });
}

// Contrats
export function getAllContrats() {
  return request({
    url: API_BASE_URL + "/api/contrats",
    method: "GET",
  });
}

export function createContrat(contratData) {
  return request({
    url: API_BASE_URL + "/contrats",
    method: "POST",
    body: JSON.stringify(contratData),
  });
}

export function updateContrat(contratId, contratData) {
  return request({
    url: API_BASE_URL + "/contrats/" + contratId,
    method: "PUT",
    body: JSON.stringify(contratData),
  });
}

export function deleteContrat(contratId) {
  return request({
    url: API_BASE_URL + "/contrats/" + contratId,
    method: "DELETE",
  });
}

// Tâches
export function getAllTaches() {
  return request({
    url: API_BASE_URL + "/api/taches",
    method: "GET",
  });
}

export function getTacheById(id) {
  return request({
    url: API_BASE_URL + "/api/taches/" + id,
    method: "GET",
  });   
}
export function getTacheByAgendaId(id) {
  return request({
    url: API_BASE_URL + "/api/agendas/"+id+"/taches",
    method: "GET",
  });   
}
export function getAllUserScheduler() {
  return request({
    url: API_BASE_URL + "/api/agendas/scheduler",
    method: "GET",
  });
}

export function createTache(tacheData, agendaId) {
  return request({
    url: API_BASE_URL + "/api/taches",
    method: "POST",
    body: JSON.stringify(tacheData),
  });
}

export function updateTache(tacheData, tacheId) {
  return request({
    url: API_BASE_URL + "/api/taches/"+tacheId,
    method: "PUT",
    body: JSON.stringify(tacheData),
  });
}

export function deleteTache(tacheId) {
  return request({
    url: API_BASE_URL + "/api/taches/" + tacheId,
    method: "DELETE",
  });
}

export function getAllAnnonces() {
  return request({
    url: API_BASE_URL + "/api/annonces",
    method: "GET",
  });
}

export function getAnnonceById(id) {
  return request({
    url: API_BASE_URL + "/api/annonces/" + id,
    method: "GET",
  });
}

export function createAnnonce(annonce) {
  return request({
    url: API_BASE_URL + "/api/annonces",
    method: "POST",
    body: JSON.stringify(annonce),
  });
}

export function updateAnnonce(annonce, id) {
  return request({
    url: API_BASE_URL + "/api/annonces/" + id,
    method: "PUT",
    body: JSON.stringify(annonce),
  });
}

export function deleteAnnonce(id) {
  return request({
    url: API_BASE_URL + "/api/annonces/" + id,
    method: "DELETE",
  });
}
