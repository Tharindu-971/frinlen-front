import { Customer } from './customer.model';
import { Product } from './product.model';

export interface Invoice {
  number: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  taxAmount: number;
  discountAmount: number;
  isApproved: boolean;
  approvedBy: string;
  reason: string;
  isActive: boolean;
  cart: Product[];
  customer:Customer
}
