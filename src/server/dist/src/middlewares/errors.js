"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoute = void 0;
const notFoundRoute = (req, res) => {
    res.status(404).send({ message: `Route not found - ${req.originalUrl}` });
};
exports.notFoundRoute = notFoundRoute;
