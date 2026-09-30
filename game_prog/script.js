const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

  });

}



// GAME FILTERING

const filterButtons = document.querySelectorAll(".filter-button");
const gameCards = document.querySelectorAll(".game-card");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;


    filterButtons.forEach((btn) => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    gameCards.forEach((card) => {

      const status = card.dataset.status;


      if (filter === "all" || status === filter) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});



// ADD GAME FORM

const gameForm = document.getElementById("game-form");


if (gameForm) {

  gameForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const gameName =
      document.getElementById("game-name").value;

    const gameStatus =
      document.getElementById("game-status").value;

    const gameNote =
      document.getElementById("game-note").value;


    console.log({
      gameName,
      gameStatus,
      gameNote
    });


    /*
      Later this will send the game
      to the backend/database.
    */


    gameForm.reset();

  });

}