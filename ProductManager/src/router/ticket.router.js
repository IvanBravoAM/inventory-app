import {Router} from 'express';
import ticketController from '../controllers/ticket.controller.js';

const ticketRouter = Router();

ticketRouter.get("/",async (req, res)=>{
    ticketController.getTicket
});

ticketRouter.post("/", async(req, res)=>{
    ticketController.addTicket
})


export default ticketRouter;