import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthStore } from 'src/app/services/auth/auth.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authStore:AuthStore,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authStore.logout();
    this.toastr.success('Logout Successfully')
    this.router.navigate(['/login'])
  }

}
