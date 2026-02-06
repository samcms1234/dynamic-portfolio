import { Router } from "express";
import { getPortfolio } from "../controllers/portfolio.controller";
import asynconHandler from '../utils/asynconHandler';

const router = Router();

router.get("/", asynconHandler(getPortfolio));

export default router;