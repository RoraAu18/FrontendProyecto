import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //aqui guardo los datos desde la pagina SIGNUP
  user = {
    usuario: '',
    password: ''
    }

  constructor(private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void{
  }

  signUp() {
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.info('Usuario creado correctamente!', 'Bienvenido!');
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private-tasks']);
        }, error => {
          console.log(error);
        }
      )}
}