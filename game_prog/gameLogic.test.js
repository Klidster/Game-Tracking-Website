const {
  formatStatus,
  createStars,
  getRating,
  filterGames
} = require("./gameLogic");



describe("formatStatus", () => {

  test("formats want-to-play correctly", () => {

    expect(
      formatStatus("want-to-play")
    ).toBe("Want to Play");

  });


  test("formats playing correctly", () => {

    expect(
      formatStatus("playing")
    ).toBe("Playing");

  });


  test("formats completed correctly", () => {

    expect(
      formatStatus("completed")
    ).toBe("Completed");

  });

});



describe("createStars", () => {

  test("creates a five star rating", () => {

    expect(
      createStars(5)
    ).toBe("★★★★★");

  });


  test("creates filled and empty stars", () => {

    expect(
      createStars(3)
    ).toBe("★★★☆☆");

  });


  test("returns nothing when there is no rating", () => {

    expect(
      createStars(null)
    ).toBe("");

  });

});



describe("getRating", () => {

  test("returns rating for a completed game", () => {

    expect(
      getRating(
        "completed",
        "4"
      )
    ).toBe(4);

  });


  test("does not save rating for a playing game", () => {

    expect(
      getRating(
        "playing",
        "5"
      )
    ).toBeNull();

  });


  test("does not save rating for a want-to-play game", () => {

    expect(
      getRating(
        "want-to-play",
        "3"
      )
    ).toBeNull();

  });


  test("returns null when completed game has no rating", () => {

    expect(
      getRating(
        "completed",
        ""
      )
    ).toBeNull();

  });

});



describe("filterGames", () => {

  const games = [

    {
      id: 1,
      name: "Elden Ring",
      status: "completed"
    },

    {
      id: 2,
      name: "Bloodborne",
      status: "playing"
    },

    {
      id: 3,
      name: "Sekiro",
      status: "completed"
    },

    {
      id: 4,
      name: "Dark Souls",
      status: "want-to-play"
    }

  ];


  test("returns all games when filter is all", () => {

    const result =
      filterGames(
        games,
        "all"
      );


    expect(
      result.length
    ).toBe(4);

  });


  test("filters completed games", () => {

    const result =
      filterGames(
        games,
        "completed"
      );


    expect(
      result.length
    ).toBe(2);


    expect(
      result[0].name
    ).toBe("Elden Ring");


    expect(
      result[1].name
    ).toBe("Sekiro");

  });


  test("filters currently playing games", () => {

    const result =
      filterGames(
        games,
        "playing"
      );


    expect(
      result.length
    ).toBe(1);


    expect(
      result[0].name
    ).toBe("Bloodborne");

  });


  test("filters want-to-play games", () => {

    const result =
      filterGames(
        games,
        "want-to-play"
      );


    expect(
      result.length
    ).toBe(1);


    expect(
      result[0].name
    ).toBe("Dark Souls");

  });

});