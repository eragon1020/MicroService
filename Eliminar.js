import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cors from "cors";

export class Eliminar {
    constructor(port, mongoURI, collectionName, dbName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.port = port;
        this.mongoURI = mongoURI;
        this.app = express();
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Modifica la ruta de la solicitud DELETE para incluir el número de documento como un parámetro
        this.app.delete('/api/eliminar/:documento', this.eliminar.bind(this));
    }

    async eliminar(req, res) {
        try {
            // Lee el número de documento de los parámetros de la URL
            const documento = req.params.documento;

            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);

            // Realiza la eliminación basada en el número de documento
            const result = await collection.deleteOne({ Documento: documento });

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
