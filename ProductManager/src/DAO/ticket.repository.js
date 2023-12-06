import { ticketModel } from "../models/ticket.model.js";


export class TicketRepository{

    async getTicket(tid){
        return ticketModel.findById(tid);
    }

    async getTicketByEmail(email){
        return ticketModel.find({ purchaser: email }).lean();
    }

    async getTicketByCode(code){
        return await ticketModel.findOne({ code }).lean();
    }
    async createTicket(ticket){
        return ticketModel.create(ticket);
    }
}