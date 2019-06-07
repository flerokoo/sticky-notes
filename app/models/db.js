import mg from 'mongoose';
import dbConfig from '../config/db-config';

export default function connectToMongo() {
    return new Promise((resolve, reject) => {
        mg.connect("mongodb://" + dbConfig.HOST + ":" + dbConfig.PORT + "/" + dbConfig.DBNAME, { useNewUrlParser: true });
        let db = mg.connection;
        db.on("error", reject);
        db.once("open", () => resolve(db));
    });
}