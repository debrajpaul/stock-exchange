/**
 * @namespace
 * @module Routes
 * @description Route details for P2P API serive.
 * */
import * as dotenv from "dotenv";
import express from "express";
import {
    body_validator,
    params_validator,
    query_validator
} from "../middleware/validator";
import input_check from "../schemas/input-check";
import SockService from "../services/sock-service";
import { success, fail } from "../utils/response-helpers";

dotenv.config();
const stockRouter = express.Router();
const sockService = SockService.newInstance();

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: To check health of the application
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: I working a_ok.
 */

stockRouter.get("/", (req, res) => {
    res.end("Sock-Exchange API service is up & running");
});

/**
 * @swagger
 *
 * /stock/{min}:
 *   get:
 *     description: Get stock ticker details.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: min
 *         description: stock time min.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 */

stockRouter.get(
    "/stock/:min",
    params_validator(input_check),
    async (req, res) => {
        try {
            res.json(
                success(
                    "fetched",
                    await sockService.stockTickerPrices(req.params.min)
                )
            );
        } catch (ex) {
            res.json(fail("failed", ex));
        }
    }
);

export default stockRouter;
