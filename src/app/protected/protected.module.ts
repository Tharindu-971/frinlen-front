import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { ListStockComponent } from './stock/list-stock/list-stock.component';
import { ApprovalComponent } from './approval/approval.component';
import { ListApprovalComponent } from './approval/list-approval/list-approval.component';
import { ApproveComponent } from './approval/approve/approve.component';
import { DetailInvoiceComponent } from './invoice/detail-invoice/detail-invoice.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    ProtectedComponent,
    HeaderComponent,
    SideBarComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    InvoiceComponent,
    CreateInvoiceComponent,
    ListInvoiceComponent,
    StockComponent,
    CreateStockComponent,
    ListStockComponent,
    ApprovalComponent,
    ListApprovalComponent,
    ApproveComponent,
    DetailInvoiceComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProtectedModule {}
