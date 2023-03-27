let response = async () => {
  await fetch(
    "https://raw.githubusercontent.com/ci2Juan/api-full/main/userFull.json",
    {
      method: "GET",
    }
  ).json()
};

console.log(response);

let idsGenerados = {};

response.forEach((objeto) => {
  let nuevoID;
  do {
    nuevoID =
      Math.floor(Math.random() * (1099999999 - 10000000 + 1)) + 10000000;
  } while (idsGenerados[nuevoID]);
  objeto = { id: nuevoID, ...objeto };
  idsGenerados[nuevoID] = true;
  listaDeObjetos.unshift(objeto);
});

console.log(listaDeObjetos);
