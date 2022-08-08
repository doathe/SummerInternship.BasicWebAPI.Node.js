import express from "express";

interface baseRouter{
    router: express.Router;
    routes(): any;
}

export default baseRouter;