export class IItem {

    id:number;
    img:string;
    nombre:string;
    precio:number;
    cantidad:number;
}
class Invoice{
    customerName: string;
    address: string;
    contactNo: number;
    email: string;
    
    products: IItem[] = [];
    additionalDetails: string;
  
    constructor(){
      // Initially one empty product row we will show 
      this.products.push(new IItem());
    }
  }


