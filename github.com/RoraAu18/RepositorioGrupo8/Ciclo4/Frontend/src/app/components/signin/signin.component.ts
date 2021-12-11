import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    usuario: '',
    password: ''
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          this.toastr.info('Autorizacion correcta!', 'Bienvenido!');
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private-tasks']);
        },
        err => console.log(err)
      )
  }
}
