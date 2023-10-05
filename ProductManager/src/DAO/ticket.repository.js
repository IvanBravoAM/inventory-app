import { ticketModel } from "../models/ticket.model.js";


export class TicketRepository{

    async getTicket(tid){
        return ticketModel.findById(tid);
    }
    async createTicket(ticket){
        return ticketModel.create(ticket);
    }
}