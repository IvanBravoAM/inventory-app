
export default class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.description = ticket.description;
        this.purchaser= ticket.purchaser;
        this.date = ticket.purchase_datetime;
        this.code= ticket.code;
        this.amount = ticket.amount;
    }
}
