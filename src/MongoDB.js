import mongoose from "mongoose";

class MongoDB {
  async connect() {
    const Env = {
      MONGO_USER: process.env.MONGO_USER,
      MONGO_PASS: process.env.MONGO_PASS,
      MONGO_URL: process.env.MONGO_URL,
      MONGO_DB: process.env.MONGO_DB
    };

    const mongoConfig = {
      url: `mongodb+srv://${Env.MONGO_USER}:${Env.MONGO_PASS}@${
        Env.MONGO_URL
      }/${Env.MONGO_DB}`,
      params: {
        useNewUrlParser: true
      }
    };

    mongoose.connect(mongoConfig.url, mongoConfig.params);

    mongoose.connection.on("connected", () =>
      console.log(`Connected ${Env.MONGO_DB}@${Env.MONGO_URL}`)
    );

    mongoose.connection.on("disconneected", () => {
      console.warn(`Disconnected from ${Env.MONGO_URL}`);
      console.warn(`Trying to reconnect  @${Env.MONGO_URL}`);
      setTimeout(
        () => mongoose.connect(mongoConfig.url, mongoConfig.params),
        5000
      );
    });

    mongoose.connection.on("error", error => {
      console.error(
        `Error on MongoDb Connection @${Env.MONGO_URL}: ${error.message}`
      );
      setTimeout(
        () => mongoose.connect(mongoConfig.url, mongoConfig.params),
        5000
      );
    });

    process.on("SIGINT", () =>
      mongoose.connection.close(() => {
        console.warn(
          `MongoDb disconeted @${Env.MONGO_URL} by the end of service`
        );
        process.exit(0);
      })
    );
  }
}

export default new MongoDB();
