const url = "http://localhost:8000/api/v1/movies";

const readAllMovies = () => {
  fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while fetching data", err);
    });
};
const readMovieByID = (id) => {
  fetch(`${url}/${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while fetching data", err);
    });
};

const createMovie = (payload) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while creating movie", err);
    });
};

const updateMovie = (id, payload) => {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while updating movie", err);
    });
};

const deleteMovie = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while deleting movie", err);
    });
};

// createMovie({
//   title: "Movie4",
//   director: "Director4",
//   category: "Fantacy",
//   year: 2025,
// });
readAllMovies();
//readMovieByID("6abb371fa30734c0a1e22e62");
// deleteMovie("6abb371fa30734c0a1e22e62");