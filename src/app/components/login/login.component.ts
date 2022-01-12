import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: "",
    password: "",
    rol: "simple",
    nombre: ""
  }

  title = 'fire-api';

  constructor(
    private authService : AuthService,
    private router: Router
     ){

  }

  ingresar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.login( email, password ).then(res=>{
      console.log("se registró: " , res);
    });
  }

  ingresarConGoogle(){
    //console.log(this.usuario);
    const { email, password } = this.usuario;

    this.authService.loginWithGoogle( email, password ).then(res=>{
      console.log("resultado de respuesta: " , res);
      if ( res ) {
        this.router.navigateByUrl("/dashboard");
      }
      else{
        this.authService.logout();

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe ingresar un dominio valido como @vuela.bo',
        });

        this.router.navigateByUrl("/login");
      }
    });
  }

  obtenerUsuarioLogeado(){
    this.authService.getUserLogged().subscribe(res =>{
      console.log(res?.email);
    });
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
