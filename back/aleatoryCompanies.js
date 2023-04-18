import { faker } from "@faker-js/faker/locale/es";
import fs from "fs";

const generateRandomData = () => {
  const data = [];
  const cities = [1];

  for (let i = 0; i < 1000; i++) {
    const companycomercialName = faker.company.name();
    const companybusinesName = companycomercialName + " Sociedad Anónima";
    const companynit =
      (Math.floor(Math.random() * 89000000) + 10000000).toString() +
      "-" +
      Math.floor(Math.random() * 9).toString();
    const cityid = cities[Math.floor(Math.random() * cities.length)];
    const companyphone = (
      Math.floor(Math.random() * 209888888) + 3001111111
    ).toString();
    let companyemail = `${companycomercialName
      .replace(/[^\w\s,]/gi, "")
      .replace(/,/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/([áäà])/g, "a")
      .replace(/([éëè])/g, "e")
      .replace(/([íïì])/g, "i")
      .replace(/([óöò])/g, "o")
      .replace(/([úüù])/g, "u")
      .replace(/\s/g, "")
      .toLowerCase()}@${faker.internet.domainName()}`;
    const companyLogo = `logos/9007689338/logo.png`;

    const company = {
      companybusinesName,
      companycomercialName,
      companynit,
      cityid,
      companyphone,
      companyemail,
      companyLogo,
    };

    data.push(company);
  }

  return data;
};

const randomData = generateRandomData();
fs.writeFile("randomCompanies.json", JSON.stringify(randomData), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Archivo guardado correctamente");
});
