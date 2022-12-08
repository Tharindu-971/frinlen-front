import { Customer } from "./customer.model";

export interface Agent{
    id?:number;
    agentName:string;
    agentMobile:string;
    agentEmail:string;
    customers:Customer[];
}