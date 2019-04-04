export class CustomerOrderDetail {
    constructor( 
        public id: string,
        public quantity: number,
        public idTree: string,
        public idCustomerOrder: string,
    ) {}
}