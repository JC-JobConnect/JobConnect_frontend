import api from "./Api";

// Education
export const getEducation = () =>
  api.get("http://127.0.0.1:8000/job/v1/educations/");

export const addEducation = (data) =>
  api.post("http://127.0.0.1:8000/job/v1/educations/", data);

export const updateEducation = (id, data) =>
  api.patch(`http://127.0.0.1:8000/job/v1/educations/${id}/`, data);

export const deleteEducation = (id) =>
  api.delete(`http://127.0.0.1:8000/job/v1/educations/${id}/`);


// Experience
export const getExperience = () =>
  api.get("http://127.0.0.1:8000/job/v1/experiences/");

export const addExperience = (data) =>
  api.post("http://127.0.0.1:8000/job/v1/experiences/", data);

export const updateExperience = (id, data) =>
  api.patch(`http://127.0.0.1:8000/job/v1/experiences/${id}/`, data);

export const deleteExperience = (id) =>
  api.delete(`http://127.0.0.1:8000/job/v1/experiences/${id}/`);

// Skills API
export const getSkill = () =>
  api.get("http://127.0.0.1:8000/job/v1/skills/");

export const addSkill = (data) =>
  api.post("http://127.0.0.1:8000/job/v1/skills/", data);

export const updateSkill = (id, data) =>
  api.patch(`http://127.0.0.1:8000/job/v1/skills/${id}/`, data);

export const deleteSkill = (id) =>
  api.delete(`http://127.0.0.1:8000/job/v1/skills/${id}/`);