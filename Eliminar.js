import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

 export class Eliminar {
    constructor(port, mongoURI , collectionName , dbName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.port = port;
        this.mongoURI = mongoURI;
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.delete('/api/eliminar', this.eliminar.bind(this));
    }

    async eliminar(req, res) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            
            const result = await collection.deleteOne(req.body);
            
            res.send({ deletedCount: result.deletedCount });
            
            client.close();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    iniciar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor de eliminación escuchando en el puerto ${this.port}`);
        });
    }
}