const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.querySelector(".nav-links");


if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

  });

}



// ELEMENTS

const gameGrid =
  document.getElementById("game-grid");

const gameForm =
  document.getElementById("game-form");

const filterButtons =
  document.querySelectorAll(".filter-button");


let games = [];

let currentFilter = "all";



// LOAD GAMES

async function loadGames() {

  try {

    const response = await fetch("/api/games");


    if (!response.ok) {

      throw new Error(
        "Could not load games"
      );

    }


    games = await response.json();


    renderGames();

  } catch (error) {

    console.error(error);


    gameGrid.innerHTML = `
      <p class="error-text">
        Could not load your games.
      </p>
    `;

  }

}



// CREATE STARS

function createStars(rating) {

  if (!rating) {

    return "";

  }


  return "★".repeat(rating)
    + "☆".repeat(5 - rating);

}



// FORMAT STATUS

function formatStatus(status) {

  if (status === "want-to-play") {

    return "Want to Play";

  }


  if (status === "playing") {

    return "Playing";

  }


  if (status === "completed") {

    return "Completed";

  }


  return status;

}



// RENDER GAMES

function renderGames() {

  let filteredGames = games;


  if (currentFilter !== "all") {

    filteredGames = games.filter(
      (game) =>
        game.status === currentFilter
    );

  }


  if (filteredGames.length === 0) {

    gameGrid.innerHTML = `
      <p class="empty-message">
        No games found.
      </p>
    `;

    return;

  }


  gameGrid.innerHTML =
    filteredGames.map((game) => {

      return `
        <div
          class="game-card"
          data-status="${game.status}"
        >

          <div class="game-image">

            <span>🎮</span>

          </div>


          <div class="game-content">

            <span
              class="game-status ${game.status}"
            >
              ${formatStatus(game.status)}
            </span>


            <h3>
              ${escapeHTML(game.name)}
            </h3>


            ${
              game.note
                ? `
                  <p>
                    ${escapeHTML(game.note)}
                  </p>
                `
                : ""
            }


            ${
              game.rating
                ? `
                  <p class="rating">
                    ${createStars(game.rating)}
                  </p>
                `
                : ""
            }


            <div class="game-actions">

              <button
                onclick="editGame(${game.id})"
              >
                Edit
              </button>


              <button
                class="delete-button"
                onclick="deleteGame(${game.id})"
              >
                Remove
              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");

}



// ADD GAME

if (gameForm) {

  gameForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById("game-name")
          .value;


      const status =
        document
          .getElementById("game-status")
          .value;


      const note =
        document
          .getElementById("game-note")
          .value;


      const ratingValue =
        document
          .getElementById("game-rating")
          .value;


      const rating =
        ratingValue
          ? Number(ratingValue)
          : null;


      try {

        const response =
          await fetch("/api/games", {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              name,
              status,
              note,
              rating

            })

          });


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.error ||
            "Could not add game"
          );

        }


        games.unshift(data);


        renderGames();


        gameForm.reset();


        document
          .getElementById("backlog")
          .scrollIntoView({
            behavior: "smooth"
          });

      } catch (error) {

        console.error(error);

        alert(error.message);

      }

    }
  );

}



// DELETE GAME

async function deleteGame(id) {

  const game =
    games.find(
      (game) => game.id === id
    );


  if (!game) {

    return;

  }


  const confirmed =
    confirm(
      `Remove "${game.name}" from your games?`
    );


  if (!confirmed) {

    return;

  }


  try {

    const response =
      await fetch(`/api/games/${id}`, {

        method: "DELETE"

      });


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "Could not remove game"
      );

    }


    games =
      games.filter(
        (game) => game.id !== id
      );


    renderGames();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}



// EDIT GAME

async function editGame(id) {

  const game =
    games.find(
      (game) => game.id === id
    );


  if (!game) {

    return;

  }


  const newName =
    prompt(
      "Game name:",
      game.name
    );


  if (newName === null) {

    return;

  }


  const newStatus =
    prompt(
      "Status: want-to-play, playing or completed",
      game.status
    );


  if (newStatus === null) {

    return;

  }


  const validStatuses = [
    "want-to-play",
    "playing",
    "completed"
  ];


  if (
    !validStatuses.includes(newStatus)
  ) {

    alert(
      "Status must be want-to-play, playing or completed."
    );

    return;

  }


  const newNote =
    prompt(
      "Note:",
      game.note || ""
    );


  if (newNote === null) {

    return;

  }


  const newRating =
    prompt(
      "Rating from 1-5. Leave blank for no rating:",
      game.rating || ""
    );


  if (newRating === null) {

    return;

  }


  let rating = null;


  if (newRating !== "") {

    rating = Number(newRating);


    if (
      rating < 1 ||
      rating > 5 ||
      Number.isNaN(rating)
    ) {

      alert(
        "Rating must be between 1 and 5."
      );

      return;

    }

  }


  try {

    const response =
      await fetch(
        `/api/games/${id}`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            name: newName,
            status: newStatus,
            note: newNote,
            rating

          })

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "Could not update game"
      );

    }


    games =
      games.map((game) => {

        if (game.id === id) {

          return data;

        }


        return game;

      });


    renderGames();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}



// FILTER GAMES

filterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      currentFilter =
        button.dataset.filter;


      filterButtons.forEach(
        (filterButton) => {

          filterButton
            .classList
            .remove("active");

        }
      );


      button
        .classList
        .add("active");


      renderGames();

    }
  );

});



// BASIC HTML SAFETY

function escapeHTML(text) {

  const div =
    document.createElement("div");


  div.textContent = text;


  return div.innerHTML;

}



// INITIAL LOAD

loadGames();