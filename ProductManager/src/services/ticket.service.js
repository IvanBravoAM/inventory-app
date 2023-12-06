import { TicketRepository } from "../DAO/ticket.repository.js";
import TicketDTO from "../DTO/ticket.dto.js";
const ticketRepository = new TicketRepository();

export class TicketService{
    async getTicket(tid){
        try{
            const ticket = ticketRepository.getTicket(tid);
            return new TicketDTO(ticket);
        }
        catch(error){
            console.log(error);
        }
    }

    async getTicketByEmail(email){
        try {
            console.log('el ticket mikjo ', email);
            const tickets = await ticketRepository.getTicketByEmail(email);
            console.log('y los ticke ', tickets);
            return tickets;
          } catch (error) {
            // Handle error, log it, or return an empty array
            console.error('Error fetching tickets:', error);
            return [];
          }
    }

    async getTicketByCode(code){
        try{
            const ticket = ticketRepository.getTicketByCode(code);
            return ticket;
        }
        catch(error){
            console.log(error);
        }
    }
    async addTicket(ticket){
        try{
            const ticketResult = ticketRepository.createTicket(ticket);
        }catch(error){
            console.log(error);
        }
    }
}