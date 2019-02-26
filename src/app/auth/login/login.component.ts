import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  backendValidation: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  loginUser() {
    if (!this.form.valid) {
      return null;
    }
    const loginData = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.login(loginData)
      .subscribe( () => {
        this.router.navigate(['/home']);
      },
      (error) => {
          this.backendValidation = error.error.data[0].msg;
      });
  }

}
