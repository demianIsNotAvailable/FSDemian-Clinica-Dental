import express from "express";
import mongoose from "mongoose";
import config from './core/config.js';
import userRouter from "./entities/users/userRouter.js";
import appRouter from "./entities/appointments/router.js";
import cors from 'cors';
const app = express();
mongoose
    .connect(config.DB_URL)
    .then(() => {
    console.log(`Database online. ${config.DB_URL}`);
})
    .catch((err) => {
    console.log(err, "Couldn't connect database.");
});
const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization"
};
app.use(express.json());
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send('Healthcheck: ok'));
app.use('/user', userRouter);
app.use('/appointments', appRouter);
app.listen(config.PORT, () => console.log(`Server listening at: ${config.PORT}`));
//# sourceMappingURL=app.js.map