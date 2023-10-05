import { TicketRepository } from "../DAO/ticket.repository.js";
import TicketDTO from "../DTO/ticket.dto.js";
const ticketRepository = new TicketRepository();

export class TicketService{
    async getTicket(tid){
        try{
            const ticket = ticketRepository.getTicketPopulate(tid);
            return new TicketDTO(ticket);
        }
        catch(error){
            console.log(error);
        }
    }
    async addTicket(ticket){
        try{
            const ticketResult = TicketRepository.createTicket(ticket);
            return new ticketDTO(ticketResult);
        }catch(error){
            console.log(error);
        }
    }
}