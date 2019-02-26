import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {

  errorMessage: string;
  paramStatusSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramStatusSubscription = this.route.params.subscribe( (params: Params) => {
      if (params['status'] == 404) {
        this.errorMessage = "Error 404, Page not found";
      } else if (params['status'] == 500) {
        this.errorMessage = "Something happen on server, sorry for this";
      }
    })

  }

  ngOnDestroy() {

  }

}
