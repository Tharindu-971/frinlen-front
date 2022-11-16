import { Agent } from 'http';

export interface Customer {
  id?: number;
  name: string;
  mobile: string;
  agent?: Agent;
}
