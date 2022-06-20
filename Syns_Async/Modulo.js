//Módulo Async
const fsA = require('fs');
  
let dataA = "Este documento es de tipo asíncrono";
  
fsA.writeFile("Asincrono.txt", dataA, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("Escritura en archivo satisfactoria\n");
    console.log("Lo escrito tiene el siguiente contenido:");
    console.log(fsA.readFileSync("Asincrono.txt", "utf8"));
  }
});

//Módulo Sync
const fsS = require('fs');
  
let dataS = "Este documento es de tipo síncrono";
  
fsS.writeFileSync("sincrono.txt", dataS);
console.log("Escritura en archivo satisfactoria\n");
console.log("Lo escrito tiene el siguiente contenido:");
console.log(fsS.readFileSync("sincrono.txt", "utf8"));