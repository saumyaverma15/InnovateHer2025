import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addData = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export async function getPosts() {
  // get 3000/posts
  const response = await axios.get(`${API_URL}/posts`);
  if (response.status === 200) {
    return response.data
  } else {
    return
  }
}

export async function getPost(id) {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  if (response.status === 200) {
    return response.data
  } else {
    return
  }
  
}

export async function createPost(post) {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response
}

export async function updatePost(id, post) {
  const response = await axios.put(`${API_URL}/posts/${id}`, post);
  return response
  
}

export async function deletePost(id) {
  const response = await axios.delete(`${API_URL}/posts/${id}`);
  return response
}


