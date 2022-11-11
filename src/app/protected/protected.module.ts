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
  ],
  imports: [CommonModule, ProtectedRoutingModule],
})
export class ProtectedModule {}
