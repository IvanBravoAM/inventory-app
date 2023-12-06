import {Router} from 'express';
import ticketController from '../controllers/ticket.controller.js';

const ticketRouter = Router();

ticketRouter.get("/",async (req, res)=>{
    const result = ticketController.getTickets(req, res);
});

ticketRouter.get("/:tid",async (req, res)=>{
    const result = ticketController.getTicket(req, res);

});

ticketRouter.post("/", async(req, res)=>{
    const result = ticketController.addTicket(req, res);
})


export default ticketRouter;