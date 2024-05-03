import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import cors from "cors";
export class Consultar {
    constructor(port, mongoURI, collectionName , dbName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.port = port;
        this.mongoURI = mongoURI;
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors())

        this.app.post('/api/consultar', this.consultar.bind(this));

     
    }

   

    async consultar(req, res) {
        try {
            console.log('Recibida solicitud de consulta:', req.body);
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            
            const result = await collection.findOne(req.body);
            
            console.log('Resultado de la consulta:', result);
            res.send(result);
            
            client.close();
        } catch (error) {
            console.error('Error al consultar:', error);
            res.status(500).send('Error interno del servidor');
        }
    }

    iniciar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor de consulta escuchando en el puerto ${this.port}`);
        });
    }
}
