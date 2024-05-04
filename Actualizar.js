import express from "express";
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

export class Actualizar {
    constructor(port, mongoURI , collectionName, dbName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.port = port;
        this.mongoURI = mongoURI;
        this.app = express();
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.put('/api/actualizar', this.actualizar.bind(this));
    }

    async actualizar(req, res) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            
            const result = await collection.updateOne(
                { Documento: req.body.Documento }, 
                { $set: req.body }
            );
            
            res.send({ modifiedCount: result.modifiedCount });
            
            client.close();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    iniciar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor de actualización escuchando en el puerto ${this.port}`);
        });
    }
}


