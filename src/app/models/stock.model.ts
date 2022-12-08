export interface Stock{
    id?:number;
    name:string;
    buyingPrice:number;
    sellingPrice:number;
    quantity:number;
    invoiceQty:number;
    approvedQty:number;
    reOrderLevel:number;
    inStock:boolean;
    status:string;
    isActive:boolean;
    unitLiters:number;
    liters:number;
    approvedQuantity:number;
}
