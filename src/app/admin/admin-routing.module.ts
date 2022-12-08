import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guard/role.guard';
import { AdminComponent } from './admin.component';
import { AgentListComponent } from './agent/agent-list/agent-list.component';
import { AgentComponent } from './agent/agent.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoiceApproveComponent } from './invoices/invoice-approve/invoice-approve.component';
import { InvoiceCreateForApprovalComponent } from './invoices/invoice-create-for-approval/invoice-create-for-approval.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { InvoicePrintComponent } from './invoices/invoice-print/invoice-print.component';
import { InvoiceReviewedListComponent } from './invoices/invoice-reviewed-list/invoice-reviewed-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { StockCreateComponent } from './stocks/stock-create/stock-create.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'agents', component: AgentComponent, children: [
          { path: 'create', component: AgentComponent },
          { path: '', component: AgentListComponent }
        ]
      },
      {
        path: 'customers', component: CustomersComponent, children: [
          { path: 'create', component: CustomerCreateComponent },
          { path: '', component: CustomerListComponent }
        ]
      },
      {
        path: 'stocks', component: StocksComponent,canActivate:[RoleGuard],
        data: {
          role: ['ROLE_ADMIN','ROLE_USER']
     }, children: [
          { path: 'create', component: StockCreateComponent },
          { path: '', component: StockListComponent }
        ]
      },
      {
        path: 'invoices', component: InvoicesComponent, children: [
          { path: 'create-for-approve', component: InvoiceCreateForApprovalComponent },
          { path: 'reviewed-list', component: InvoiceReviewedListComponent },
          { path: ':id/approve', component: InvoiceApproveComponent },
          { path: ':id/print', component: InvoicePrintComponent },
          { path: '', component: InvoiceListComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }