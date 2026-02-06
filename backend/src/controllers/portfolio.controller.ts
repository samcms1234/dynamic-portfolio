import { Request, Response } from "express";
import { buildPort } from "../services/portfolio.service";

export async function getPortfolio(req: Request, res: Response) {
    console.log("Portfolio controller hit");
    const portfolio =  await buildPort();
    res.json(portfolio);
}