import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})

export class SignupComponent implements OnInit {

  isProgressLoading = false;

  constructor(private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() { }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isProgressLoading = true;
    this._authService.createUser(form.value.email, form.value.password)
      .subscribe(response => {
        console.log(response);
        this._router.navigate(['/']);
      }, error => {
        console.log(error);
        this.isProgressLoading = false;
      });
  }
}
