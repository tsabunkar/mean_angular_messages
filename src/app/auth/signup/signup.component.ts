import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})

export class SignupComponent implements OnInit {

  isProgressLoading = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() { }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._authService.createUser(form.value.email, form.value.password);
  }
}
