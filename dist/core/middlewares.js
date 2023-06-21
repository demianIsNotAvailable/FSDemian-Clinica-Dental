import jwt from "jsonwebtoken";
import { MongoServerError } from "mongodb";
import config from "./config.js";
export const tokenGenerator = (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "NO_TOKEN" });
    }
    return (token = token.split(" ")[1]);
};
export const auth = (req, res, next) => {
    try {
        const decodedPayload = jwt.verify(tokenGenerator(req, res), config.SECRET);
        req.payload = { id: decodedPayload.id, role: decodedPayload.role };
        next();
    }
    catch (e) {
        return next(new Error("INVALID_CREDENTIALS"));
    }
};
export const isAdminCheck = (req, res, next) => {
    return req.payload.role == "ADMIN"
        ? next()
        : next(new Error("INVALID CREDENTIALS"));
};
export const errorHandler = (err, req, res, next) => {
    if (err.message === "INVALID_PASSWORD")
        return res.status(400).json({ error: "INVALID_PASSWORD" });
    if (err.message === "MISSING_DATA")
        return res.status(400).json({ error: "MISSING_DATA" });
    if (err.message === "DUPLICATED_DATE")
        return res.status(400).json({ error: "BAD_DATE" });
    if (err.message === "NO_TOKEN")
        return res.status(401).json({ error: "BAD_TOKEN" });
    if (err.message === "INVALID_CREDENTIALS")
        return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    if (err.message === "NOT_AUTHORIZED")
        return res.status(401).json({ error: "NOT_AUTHORIZED" });
    if (err.message === "NOT_FOUND")
        return res.status(404).json({ error: "NOT_FOUND" });
    if (err instanceof MongoServerError && err.code === 11000)
        return res.status(422).json({ error: "DUPLICATE_ENTITY", entities: Object.keys(err.keyPatter) });
    return res.status(500).json({ error: "SERVER_ERROR", err });
};
//# sourceMappingURL=middlewares.js.map