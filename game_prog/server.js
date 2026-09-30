const express = require("express");
const db = require("./database");

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(express.static("."));



// GET ALL GAMES

app.get("/api/games", (req, res) => {

  try {

    const games = db
      .prepare(`
        SELECT *
        FROM games
        ORDER BY created_at DESC
      `)
      .all();


    res.json(games);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Could not load games"
    });

  }

});



// ADD GAME

app.post("/api/games", (req, res) => {

  try {

    const {
      name,
      status,
      note,
      rating
    } = req.body;


    if (!name || !status) {

      return res.status(400).json({
        error: "Game name and status are required"
      });

    }


    const result = db
      .prepare(`
        INSERT INTO games (
          name,
          status,
          note,
          rating
        )
        VALUES (?, ?, ?, ?)
      `)
      .run(
        name.trim(),
        status,
        note?.trim() || "",
        rating || null
      );


    const newGame = db
      .prepare(`
        SELECT *
        FROM games
        WHERE id = ?
      `)
      .get(result.lastInsertRowid);


    res.status(201).json(newGame);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Could not add game"
    });

  }

});



// UPDATE GAME

app.put("/api/games/:id", (req, res) => {

  try {

    const id = req.params.id;


    const {
      name,
      status,
      note,
      rating
    } = req.body;


    if (!name || !status) {

      return res.status(400).json({
        error: "Game name and status are required"
      });

    }


    const existingGame = db
      .prepare(`
        SELECT *
        FROM games
        WHERE id = ?
      `)
      .get(id);


    if (!existingGame) {

      return res.status(404).json({
        error: "Game not found"
      });

    }


    db.prepare(`
      UPDATE games
      SET
        name = ?,
        status = ?,
        note = ?,
        rating = ?
      WHERE id = ?
    `)
      .run(
        name.trim(),
        status,
        note?.trim() || "",
        rating || null,
        id
      );


    const updatedGame = db
      .prepare(`
        SELECT *
        FROM games
        WHERE id = ?
      `)
      .get(id);


    res.json(updatedGame);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Could not update game"
    });

  }

});



// DELETE GAME

app.delete("/api/games/:id", (req, res) => {

  try {

    const id = req.params.id;


    const result = db
      .prepare(`
        DELETE FROM games
        WHERE id = ?
      `)
      .run(id);


    if (result.changes === 0) {

      return res.status(404).json({
        error: "Game not found"
      });

    }


    res.json({
      message: "Game removed"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Could not remove game"
    });

  }

});



// START SERVER

app.listen(PORT, () => {

  console.log(
    `GameProg running at http://localhost:${PORT}`
  );

});