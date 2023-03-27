const Pool = require("pg").Pool;
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "prueba",
  password: "root",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = async (request, response) => {
  try {
    const data = await loadData();
    let idsGenerados = {};

    data.forEach((objeto) => {
      let nuevoID;
      do {
        nuevoID =
          Math.floor(Math.random() * (1099999999 - 10000000 + 1)) + 10000000;
      } while (idsGenerados[nuevoID]);
      objeto = { id: nuevoID, ...objeto };
      idsGenerados[nuevoID] = true;
      data.unshift(objeto);
    });

    const dataList = data.filter((item) => Object.keys(item).length === 6);
    const promises = dataList.map((item) => {
      return new Promise((resolve, reject) => {
        pool.query(
          "INSERT INTO users (id, name, gender, height, eye_color, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid, id",
          [
            item.id,
            item.name,
            item.gender,
            item.height,
            item.eye_color,
            item.image,
          ],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results.rows[0]);
            }
          }
        );
      });
    });
    const results = await Promise.all(promises);
    const users = results.map((result) => ({
      userId: result.userid,
      id: result.id,
    }));

    response.status(201).json(users);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
};

const loadData = async () => {
  let response = await fetch(
    "https://raw.githubusercontent.com/ci2Juan/api-full/main/userFull.json",
    {
      method: "GET",
    }
  );

  return await response.json();
};

module.exports = {
  getUsers,
  createUser,
};
