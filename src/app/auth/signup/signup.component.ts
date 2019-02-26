import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.required , Validators.email],
        asyncValidators: this.checkEmail.bind(this)
      }),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)] ),
      confirmPassword: new FormControl(null, [Validators.required] )
    }, { validators: this.matchPassword})

  }

  signupUser() {
    if(!this.form.valid) {
      return null;
    }
    const signupData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword
    }

    this.authService.signup(signupData);
    
  }

  checkEmail(control: FormControl): Observable<ValidationErrors | null> {
    return this.authService.checkEmail(control.value).pipe( 
      map(result => {
        if (result.emailExist) {
          return {emailExist: true}
        } else {
          return null;
        }
    })
    ) 
  }

  matchPassword(formGroup: FormGroup){
    let password = formGroup.get('password');
    let confirmPassword = formGroup.get('confirmPassword');
    return password.value !== confirmPassword.value  ? {'matchPassword': true} : null;
  }

}
