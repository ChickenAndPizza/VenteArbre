import { CustomerOrderDetail } from "./customer-order-detail";

export class CustomerOrder {
    constructor( 
        public id: string,
        public transactionDate: Date,
        public state: number,
        public idCustomer: string,
        public orderDetails: CustomerOrderDetail[]
    ) {}
}