import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']

})

export class SigninComponent implements OnInit {

  isProgressLoading = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() { }

  onSignIn(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._authService.signIn(form.value.email, form.value.password);
  }
}
