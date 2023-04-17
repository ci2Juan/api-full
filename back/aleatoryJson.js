import { faker } from "@faker-js/faker/locale/es";
import fs from 'fs'

const generateRandomData = () => {
  const data = [];
  const idents = [1, 2];
  const genders = [1, 2, 3];
  const cities = [1];

  for (let i = 0; i < 1000; i++) {
    const username = faker.name.firstName();
    const userlastname = faker.name.lastName();
    const identdocid = idents[Math.floor(Math.random() * idents.length)];
    const useridentnum = (Math.floor(Math.random() * 1000000000) + 10000000).toString();
    const userbirthdate = faker.date.past().toLocaleDateString("es-ES", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('/');
    const genderid = genders[Math.floor(Math.random() * genders.length)];
    const userphone = (Math.floor(Math.random() * 209888888) + 3001111111).toString();
    const usercity = cities[Math.floor(Math.random() * cities.length)];
    const useractive = true;
    const usericon = `https://photosfromtudatausers.com/id/${useridentnum}`;
    const planid = faker.datatype.number({ min: 2, max: 3 });
    const userterms = true;
    const userpolicies = true;
    const userdocumentpath = `https://documentsfromtudatausers.com/id/${useridentnum}`;
    const credentialemail = `${useridentnum}@${faker.internet.domainName()}`;
    const credentialpass = `Pass${useridentnum}*`;
    const credentialsenabled = true;

    const user = {
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
      planid,
      userterms,
      userpolicies,
      userdocumentpath,
      credentialemail,
      credentialpass,
      credentialsenabled,
    };

    data.push(user);
  }

  return data;
};

const randomData = generateRandomData();
fs.writeFile("randomData.json", JSON.stringify(randomData), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Archivo guardado correctamente");
});
