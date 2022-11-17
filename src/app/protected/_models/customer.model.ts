import { Agent } from './agent.model';

export interface Customer {
  id?: number;
  name: string;
  mobile: string;
  email:string;
  agent?: Agent;
}
