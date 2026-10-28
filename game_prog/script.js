const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.querySelector(".nav-links");

const gameGrid =
  document.getElementById("game-grid");

const gameForm =
  document.getElementById("game-form");

const filterButtons =
  document.querySelectorAll(".filter-button");

const logoutButton =
  document.getElementById("logout-button");

const editModal =
  document.getElementById("edit-modal");

const modalClose =
  document.getElementById("modal-close");

const editGameForm =
  document.getElementById("edit-game-form");

const gameStatus =
  document.getElementById("game-status");

const ratingGroup =
  document.getElementById("rating-group");

const editGameStatus =
  document.getElementById("edit-game-status");

const editRatingGroup =
  document.getElementById("edit-rating-group");

const userEmail =
  document.getElementById("user-email");


let games = [];

let currentFilter = "all";

let currentUser = null;



// MOBILE MENU

if (
  menuToggle &&
  navLinks
) {

  menuToggle.addEventListener(
    "click",
    () => {

      navLinks.classList.toggle(
        "show"
      );

    }
  );

}



// RATING VISIBILITY

function updateRatingVisibility(
  statusElement,
  ratingElement,
  ratingSelect
) {

  if (
    statusElement.value ===
    "completed"
  ) {

    ratingElement.style.display =
      "block";

  } else {

    ratingElement.style.display =
      "none";


    if (ratingSelect) {

      ratingSelect.value = "";

    }

  }

}



// ADD GAME STATUS CHANGE

if (
  gameStatus &&
  ratingGroup
) {

  gameStatus.addEventListener(
    "change",
    () => {

      const ratingSelect =
        document.getElementById(
          "game-rating"
        );


      updateRatingVisibility(
        gameStatus,
        ratingGroup,
        ratingSelect
      );

    }
  );

}



// EDIT GAME STATUS CHANGE

if (
  editGameStatus &&
  editRatingGroup
) {

  editGameStatus.addEventListener(
    "change",
    () => {

      const ratingSelect =
        document.getElementById(
          "edit-game-rating"
        );


      updateRatingVisibility(
        editGameStatus,
        editRatingGroup,
        ratingSelect
      );

    }
  );

}



// CHECK LOGIN

async function checkUser() {

  const {
    data,
    error
  } =
    await supabaseClient
      .auth
      .getUser();


  if (
    error ||
    !data.user
  ) {

    window.location.href =
      "login.html";

    return false;

  }


  currentUser =
    data.user;


  if (userEmail) {

    userEmail.textContent =
      currentUser.email;

  }


  return true;

}



// LOAD GAMES

async function loadGames() {

  const loggedIn =
    await checkUser();


  if (!loggedIn) {

    return;

  }


  const {
    data,
    error
  } =
    await supabaseClient

      .from("games")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(error);


    gameGrid.innerHTML = `

      <p class="error-text">

        Could not load your games.

      </p>

    `;


    return;

  }


  games =
    data;


  renderGames();

}

// ESCAPE USER TEXT

function escapeHTML(text) {

  const div =
    document.createElement("div");


  div.textContent =
    text || "";


  return div.innerHTML;

}



// RENDER GAMES

function renderGames() {

  const filteredGames =
    GameLogic.filterGames(
      games,
      currentFilter
    );


  if (
    filteredGames.length === 0
  ) {

    gameGrid.innerHTML = `

      <p class="empty-message">

        No games found.

      </p>

    `;


    return;

  }


  gameGrid.innerHTML =
    filteredGames

      .map(
        (game) => `

          <div
            class="game-card"
            data-status="${game.status}"
          >


            <div class="game-image">

              <span>
                🎮
              </span>

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
                game.status ===
                  "completed"
                &&
                game.rating

                  ? `

                    <p class="rating">

                      ${GameLogic.createStars(game.rating)}

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

        `
      )

      .join("");

}



// ADD GAME

if (gameForm) {

  gameForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "game-name"
          )
          .value
          .trim();


      const status =
        document
          .getElementById(
            "game-status"
          )
          .value;


      const note =
        document
          .getElementById(
            "game-note"
          )
          .value
          .trim();


      const ratingValue =
        document
          .getElementById(
            "game-rating"
          )
          .value;


      const rating =
        GameLogic.getRating(
          status,
          ratingValue
        );


      const {
        data,
        error
      } =
        await supabaseClient

          .from("games")

          .insert({

            user_id:
              currentUser.id,

            name,

            status,

            note,

            rating

          })

          .select()

          .single();


      if (error) {

        console.error(error);


        alert(
          "Could not add game."
        );


        return;

      }


      games.unshift(data);


      renderGames();


      gameForm.reset();


      updateRatingVisibility(
        gameStatus,
        ratingGroup,
        document.getElementById(
          "game-rating"
        )
      );


      document
        .getElementById("backlog")
        .scrollIntoView({

          behavior: "smooth"

        });

    }
  );

}



// DELETE GAME

async function deleteGame(id) {

  const game =
    games.find(
      (game) =>
        game.id === id
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


  const {
    error
  } =
    await supabaseClient

      .from("games")

      .delete()

      .eq(
        "id",
        id
      );


  if (error) {

    console.error(error);


    alert(
      "Could not remove game."
    );


    return;

  }


  games =
    games.filter(
      (game) =>
        game.id !== id
    );


  renderGames();

}



// OPEN EDIT MODAL

function editGame(id) {

  const game =
    games.find(
      (game) =>
        game.id === id
    );


  if (!game) {

    return;

  }


  document
    .getElementById(
      "edit-game-id"
    )
    .value =
      game.id;


  document
    .getElementById(
      "edit-game-name"
    )
    .value =
      game.name;


  document
    .getElementById(
      "edit-game-status"
    )
    .value =
      game.status;


  document
    .getElementById(
      "edit-game-rating"
    )
    .value =
      game.rating || "";


  document
    .getElementById(
      "edit-game-note"
    )
    .value =
      game.note || "";


  updateRatingVisibility(
    editGameStatus,
    editRatingGroup
  );


  editModal.classList.add(
    "show"
  );

}



// SAVE EDITED GAME

if (editGameForm) {

  editGameForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const id =
        Number(
          document
            .getElementById(
              "edit-game-id"
            )
            .value
        );


      const name =
        document
          .getElementById(
            "edit-game-name"
          )
          .value
          .trim();


      const status =
        document
          .getElementById(
            "edit-game-status"
          )
          .value;


      const note =
        document
          .getElementById(
            "edit-game-note"
          )
          .value
          .trim();


      const ratingValue =
        document
          .getElementById(
            "edit-game-rating"
          )
          .value;


      let rating =
        null;


      if (
        status === "completed"
        &&
        ratingValue
      ) {

        rating =
          Number(ratingValue);

      }


      const {
        data,
        error
      } =
        await supabaseClient

          .from("games")

          .update({

            name,

            status,

            note,

            rating

          })

          .eq(
            "id",
            id
          )

          .select()

          .single();


      if (error) {

        console.error(error);


        alert(
          "Could not update game."
        );


        return;

      }


      games =
        games.map(
          (game) => {

            if (
              game.id === id
            ) {

              return data;

            }


            return game;

          }
        );


      renderGames();


      editModal.classList.remove(
        "show"
      );

    }
  );

}



// CLOSE MODAL WITH X

if (modalClose) {

  modalClose.addEventListener(
    "click",
    () => {

      editModal.classList.remove(
        "show"
      );

    }
  );

}



// CLOSE MODAL BY CLICKING OUTSIDE

if (editModal) {

  editModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        editModal
      ) {

        editModal.classList.remove(
          "show"
        );

      }

    }
  );

}



// FILTERS

filterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        currentFilter =
          button.dataset.filter;


        filterButtons.forEach(
          (filterButton) => {

            filterButton
              .classList
              .remove(
                "active"
              );

          }
        );


        button
          .classList
          .add(
            "active"
          );


        renderGames();

      }
    );

  }
);



// LOGOUT

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    async () => {

      await supabaseClient
        .auth
        .signOut();


      window.location.href =
        "login.html";

    }
  );

}



// INITIAL FORM STATE

if (
  gameStatus &&
  ratingGroup
) {

  updateRatingVisibility(
    gameStatus,
    ratingGroup,
    document.getElementById(
      "game-rating"
    )
  );

}



// INITIAL LOAD

loadGames();