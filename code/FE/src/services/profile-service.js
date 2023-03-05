import API from '../utils/api';
import { setLocalUserInfo } from '../utils/local-storage';

export const fetchProfileModify = async (info) => {
  try {
    const response = await API.post('/user/auth/update', info, {
      'Content-Type': 'application/json',
    });
    const { data, status } = response;
    if (data === 'Success') {
      setLocalUserInfo(info);
    }
    return { data, status, error: null };
  } catch (error) {
    return { data: error.message, status: error.response.status, error };
  }
};

export const fetchUserStackById = async (id) => {
  try {
    const { data, status } = await API.get(`/user/auth/techList/${id}`);
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchAllStacks = async (id) => {
  try {
    const { data, status } = await API.get('/user/allTechList');
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchTechSave = async (user_id, tech_list) => {
  try {
    const { data, status } = await API.post(
      `/user/addTechList/${user_id}`,
      tech_list
    );
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchGetImageUrl = async (formData) => {
  try {
    API.defaults.headers['Content-Type'] = 'multipart/form-data';
    const { data, status } = await API.post('/user/uploadProfileImg', formData);
    API.defaults.headers['Content-Type'] = 'application/json';
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchProfileImage = async (url, user_id) => {
  const body = {
    url,
    user_id,
  };
  try {
    const { data, status } = await API.post('/user/auth/setProfileImg', body);
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};
