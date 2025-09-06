import express from 'express'
import mysql from 'mysql2'

const MESSAGE = '<h1>Full Cycle Rocks!</h1>';

const app = express();
const port = 3000;
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);

  connection.query(`INSERT INTO people(name) values('${getRandomPerson()}')`);
  connection.query('SELECT * FROM people', (err, results) => {
    if (err) throw err;

    res.send(MESSAGE + createTable({ people: results }));
  });
  
  connection.end();
});

app.listen(port, () => {
	console.log('Rodando na porta ' + port);
})

const getRandomPerson = () => {
  const names = ['Maria', 'Douglas', 'Pedro', 'Ana', 'Caio', 'Raquel'];  

  return names[Math.floor(Math.random() * names.length)];
}

const createTable = ({ people }) => {
  let tableNames = '';

  for (const person of people) {
    tableNames += `<tr><td style="border: 1px solid rgb(160 160 160);text-align: center;">${person.name}</td></tr>`
  }

  return `<table style="border: 2px solid rgb(140 140 140);"><tr><th>Nome</th></tr>${tableNames}</table>`
}