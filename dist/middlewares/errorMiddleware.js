"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res.on("finish", function () {
        console.error(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    res.status(500).send("Internal Server Error");
};
exports.errorHandler = errorHandler;
