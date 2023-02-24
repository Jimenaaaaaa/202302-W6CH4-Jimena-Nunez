/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/restrict-plus-operands */

import http from 'http';
import fs from 'fs';
import url from 'url';
import { calculadora } from './calculadora.js';
import * as dotenv from 'dotenv';

dotenv.config();

import { program } from 'commander';
program.option('--port <char>');
program.parse();
const options = program.opts();
export const newPort = options.port;

const PORT = newPort || process.env.PORT || 4000;

const server = http.createServer((req, resp) => {
  if (!req.url) {
    server.emit('error', new Error('Error 404'));
    return;
  }

  const { search, pathname } = url.parse(req.url);
  const urlParams = new URLSearchParams(search);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('Error 404 - incorrect path'));
    resp.write(`<p>ERROR 404 - Incorrect path</p>`);
    return;
  }

  const num1 = urlParams.get('a');
  const num2 = urlParams.get('b');

  resp.writeHead(200, {
    'Content-Type': 'text/html',
  });

  if (isNaN(num1 + 1) || isNaN(num2 + 1)) {
    server.emit('error', new Error('Error, introduce numeros'));
    resp.write(`<p>ERROR - Introduce numeros</p>`);
    return;
  }

  const answers = calculadora(num1, num2);

  resp.write(`
  <h1>Calculadora</h1>
  <p>${num1} + ${num2} = ${answers.sum} </p>
  <p>${num1} - ${num2} = ${answers.rest} </p>
  <p>${num1} x ${num2} = ${answers.mult} </p>
  <p>${num1} / ${num2} = ${answers.div} </p>
  `);

  switch (req.method) {
    case 'GET':
      if (!req.url) {
        server.emit('error', new Error('invalid url'));
        return;
      }

      // const files = fs.readFile('data.json', { encoding: 'utf-8' });

      // resp.write(files);
      break;

    case 'POST':
      console.log('hola');
      break;

    case 'PATCH':
    case 'DELETE':
      resp.write('prueba');
      break;

    default:
      resp.write('No conozco el metodo ' + req.method);
      break;
  }
});

// Necesito emitir en otro sitio el evento. erver.emit()
server.on('error', () => {});

// Este metodo les permite escuchar eventos.
// hay un metodo nativo que se llama 'listening'
server.on('listening', () => {
  console.log('listening in http://localhost:' + PORT);
});

// El servidor se queda escuchando en este puerto
server.listen(PORT);
