import express from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import { Sequelize, DataTypes } from "sequelize";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Configurar la conexión a la base de datos
const sequelize = new Sequelize("postgres://root:root@localhost:5432/tudata");

// Definir los modelos de las tablas
const Person = sequelize.define("Persons", {
  personid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  username: DataTypes.STRING,
  userlastname: DataTypes.STRING,
  identdocid: DataTypes.INTEGER,
  useridentnum: DataTypes.STRING,
  userbirthdate: DataTypes.STRING,
  genderid: DataTypes.INTEGER,
  userphone: DataTypes.STRING,
  usercity: DataTypes.INTEGER,
  useractive: DataTypes.BOOLEAN,
  usericon: DataTypes.STRING,
});

const User = sequelize.define("Users", {
  personid: {
    type: DataTypes.UUID,
    references: { model: "Persons", key: "personid" },
  },
  userid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  planid: DataTypes.INTEGER,
  userterms: DataTypes.BOOLEAN,
  userpolicies: DataTypes.BOOLEAN,
  userdocumentpath: DataTypes.STRING,
});

const Credential = sequelize.define("Credentials", {
  userid: {
    type: DataTypes.UUID,
    references: { model: "Users", key: "userid" },
  },
  credentialemail: DataTypes.STRING,
  credentialpass: DataTypes.STRING,
  credentialsenabled: DataTypes.BOOLEAN,
});

// Definir la ruta para crear la base de datos y las tablas
app.get("/createdb", async (req, res) => {
  try {
    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: true });
    res.send("Base de datos creada con éxito");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la base de datos");
  }
});

// Obtener todos los registros de la tabla Person
app.get("/person", async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los registros de la tabla Person");
  }
});

// Crear un registro en la tabla Person
app.post("/person", async (req, res) => {
  try {
    const {
      username,
      userlastname,
      identdocid,
      useridentnum,
      userbirthdate,
      genderid,
      userphone,
      usercity,
      useractive,
      usericon,
    } = req.body;
    const person = await Person.create({
      personid: uuidv4(),
      username,
      userlastname,
      identdocid,
      useridentnum,
      userbirthdate,
      genderid,
      userphone,
      usercity,
      useractive,
      usericon,
    });
    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear un registro en la tabla Person");
  }
});

// Obtener todos los registros de la tabla User
app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los registros de la tabla User");
  }
});

// Crear un registro en la tabla User
app.post("/user", async (req, res) => {
  try {
    const {
      personid,
      planid,
      userterms,
      userpolicies,
      userdocumentpath,
    } = req.body;
    const user = await User.create({
      personid,
      userid: uuidv4(),
      planid,
      userterms,
      userpolicies,
      userdocumentpath,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear un registro en la tabla User");
  }
});

// Obtener todos los registros de la tabla Credential
app.get("/credential", async (req, res) => {
  try {
    const credentials = await Credential.findAll();
    res.json(credentials);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error al obtener los registros de la tabla Credential");
  }
});

// Crear un registro en la tabla Credential
app.post("/credential", async (req, res) => {
  try {
    const { userid, credentialemail, credentialpass, credentialsenabled } =
      req.body;
    const credential = await Credential.create({
      userid,
      credentialemail,
      credentialpass,
      credentialsenabled,
    });
    res.json(credential);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear un registro en la tabla Credential");
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
