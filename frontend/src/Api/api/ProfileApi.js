
import api from "./Api";

// PROFILE
export const getProfile = () =>
  api.get("job/v1/profile/");

export const updateProfile = (data) =>
  api.patch("job/v1/profile/", data);

// EDUCATION
export const getEducation = () =>
  api.get("job/v1/educations/");

export const addEducation = (data) =>
  api.post("job/v1/educations/", data);

export const updateEducation = (id, data) =>
  api.patch(`job/v1/educations/${id}/`, data);

export const deleteEducation = (id) =>
  api.delete(`job/v1/educations/${id}/`);

// EXPERIENCE
export const getExperience = () =>
  api.get("job/v1/experiences/");

export const addExperience = (data) =>
  api.post("job/v1/experiences/", data);

export const updateExperience = (id, data) =>
  api.patch(`job/v1/experiences/${id}/`, data);

export const deleteExperience = (id) =>
  api.delete(`job/v1/experiences/${id}/`);

// SKILLS
export const getSkill = () =>
  api.get("job/v1/skills/");

export const addSkill = (data) =>
  api.post("job/v1/skills/", data);

export const updateSkill = (id, data) =>
  api.patch(`job/v1/skills/${id}/`, data);

export const deleteSkill = (id) =>
  api.delete(`job/v1/skills/${id}/`);
