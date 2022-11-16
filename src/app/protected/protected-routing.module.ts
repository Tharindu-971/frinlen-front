import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalComponent } from './approval/approval.component';
import { ApproveComponent } from './approval/approve/approve.component';
import { ListApprovalComponent } from './approval/list-approval/list-approval.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { DetailInvoiceComponent } from './invoice/detail-invoice/detail-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ProtectedComponent } from './protected.component';
import { RegisterComponent } from './register/register.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { ListStockComponent } from './stock/list-stock/list-stock.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: ProtectedComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'user', component: BoardUserComponent },
      { path: 'mod', component: BoardModeratorComponent },
      { path: 'admin', component: BoardAdminComponent },
      {
        path: 'invoice',
        component: InvoiceComponent,
        children: [
          { path: 'create', component: CreateInvoiceComponent },
          { path: 'view', component: DetailInvoiceComponent },
          { path: 'list', component: ListInvoiceComponent },
        ],
      },
      {
        path: 'stock',
        component: StockComponent,
        children: [
          { path: 'create', component: CreateStockComponent },
          { path: 'list', component: ListStockComponent },
        ],
      },
      {
        path: 'approval',
        component: ApprovalComponent,
        children: [
          { path: 'approve', component: ApproveComponent },
          { path: 'list', component: ListApprovalComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
