import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  userSubscription: Subscription;
  user;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe( user => {
      this.user= user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
