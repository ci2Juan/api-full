import axios from 'axios'

export function getMovieCharacters() {
  return axios.get('http://localhost:3000/users')
  .then(response => {
    return response.data;
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
  })
}
