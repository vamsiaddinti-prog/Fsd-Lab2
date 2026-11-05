const url = "http://localhost:8000/api/v1/movies";

const createMovie = (movie) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const readAllMovies = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const readMovieById = (id) => {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const updateMovieById = (id, updatedData) => {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const deleteMovieById = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

// createMovie({
//   title: "Sample Movie2",
//   director: "Director Name2",
//   genre: "Action",
//   year: 2000,
// });

readAllMovies();

// readMovieById("6ab3ff467c6bcffc85d500ce");

// updateMovieById("6ab8c3151a9377fa6a8b53a2", {
//   title: "Bahubali",
//   director: "Rajamouli",
//   genre: "Fantasy",a
//   year: 2010,
// });

//deleteMovieById("6ab3ff467c6bcffc85d500ce");