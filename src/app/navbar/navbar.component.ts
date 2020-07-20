import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit ,OnDestroy {

  private userSub : Subscription;

  constructor(private authservive : AuthService,  private router : Router) { }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.userSub = this.authservive.LoginStatus.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );   
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authservive.logout()
    this.router.navigate(['/login'])
  }

}
