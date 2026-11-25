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


function createStars(rating) {

  if (!rating) {
    return "";
  }

  return (
    "★".repeat(rating) +
    "☆".repeat(5 - rating)
  );
}


function getRating(status, ratingValue) {

  if (
    status !== "completed" ||
    !ratingValue
  ) {
    return null;
  }

  return Number(ratingValue);
}


function filterGames(games, filter) {

  if (filter === "all") {
    return games;
  }

  return games.filter(
    (game) =>
      game.status === filter
  );
}


// Browser

if (typeof window !== "undefined") {

  window.GameLogic = {
    formatStatus,
    createStars,
    getRating,
    filterGames
  };

}


// Jest / Node

if (typeof module !== "undefined") {

  module.exports = {
    formatStatus,
    createStars,
    getRating,
    filterGames
  };

}