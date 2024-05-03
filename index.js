import { Insertar} from './Insertar.js';
import{Consultar} from './Consultar.js';
import{Eliminar} from './Eliminar.js';
import {Actualizar} from './Actualizar.js';

const puertoPrincipal = 3000;
const mongoURI = 'mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/';
const collectionName = "UsuariosM";

const servidorInsertar = new Insertar(3001, mongoURI, collectionName);
const servidorConsultar = new Consultar(3002, mongoURI, collectionName);
const servidorEliminar = new Eliminar(3003, mongoURI, collectionName);
const servidorActualizar = new Actualizar(3004, mongoURI , collectionName);

servidorInsertar.iniciar();
servidorConsultar.iniciar();
servidorEliminar.iniciar();
servidorActualizar.iniciar();

console.log(`Servidor principal escuchando en el puerto ${puertoPrincipal}`);
