module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },

  addMovie: (newMovie) => {
    const url = '/api/movies';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    };
    return fetch(url, options)
        .then(response => response.json());
  },

  editMovie: (id, editedMovie) => {
    console.log(id);
    const url = `/api/movies/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMovie),
    };
    return fetch(url, options)
        .then(response => response.json());
  },


  deleteMovie: (id) => {
    console.log(id);
    const url = `/api/movies/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(id),
    };
    return fetch(url, options)
        .then(response => response.json());
  }

};
