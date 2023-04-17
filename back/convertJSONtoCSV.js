import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';

const csvWriter = createObjectCsvWriter({
  path: 'tudatausers.csv',
  header: [
    { id: 'userName', title: 'userName' },
    { id: 'userLastName', title: 'userLastName' },
    { id: 'identDocId', title: 'identDocId' },
    { id: 'userIdentNum', title: 'userIdentNum' },
    { id: 'userIdentType', title: 'userIdentType' },
    { id: 'userBirthDt', title: 'userBirthDt' },
    { id: 'genderId', title: 'genderId' },
    { id: 'userPhone', title: 'userPhone' },
    { id: 'userCity', title: 'userCity' },
    { id: 'userActive', title: 'userActive' },
    { id: 'userIcon', title: 'userIcon' },
    { id: 'planId', title: 'planId' },
    { id: 'userTerms', title: 'userTerms' },
    { id: 'userPolicies', title: 'userPolicies' },
    { id: 'userDocumentPath', title: 'userDocumentPath' },
    { id: 'credentialEmail', title: 'credentialEmail' },
    { id: 'credentialPass', title: 'credentialPass' },
    { id: 'credentialsEnabled', title: 'credentialsEnabled' },
  ],
});

fs.readFile('/home/camilo/Escritorio/tudatausers.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const jsonData = JSON.parse(data);
  const records = jsonData.map((item) => ({
    userName: item.userName,
    userLastName: item.userLastName,
    identDocId: item.identDocId,
    userIdentNum: item.userIdentNum,
    userIdentType: item.userIdentType,
    userBirthDt: item.userBirthDt,
    genderId: item.genderId,
    userPhone: item.userPhone,
    userCity: item.userCity,
    userActive: item.userActive,
    userIcon: item.userIcon,
    planId: item.planId,
    userTerms: item.userTerms,
    userPolicies: item.userPolicies,
    userDocumentPath: item.userDocumentPath,
    credentialEmail: item.credentialEmail,
    credentialPass: item.credentialPass,
    credentialsEnabled: item.credentialsEnabled,
  }));

  csvWriter.writeRecords(records)
    .then(() => console.log('The CSV file was written successfully'));
});
