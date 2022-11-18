import { Agent } from './agent.model';

export interface Customer {
  id?: number;
  name: string;
  mobile: string;
  email:string;
  address1:string;
  address2?:string;
  agent?: Agent;
}
