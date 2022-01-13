import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rolForm!: FormGroup;

  listaDeUsuarios: any = [];
  ListaDeRoles: any = [
    {
      rol: 'Bodeguero'
    },
    {
      rol: 'Logistico'
    },
    {
      rol: 'Administrador'
    }
  ]

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getAll().then( firebaseResponse =>{
      firebaseResponse?.subscribe(listaDeUsuarioRef =>{

        this.listaDeUsuarios = listaDeUsuarioRef.map((usuarioRef: any) =>{
          let usuario: any = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          console.log(usuario);
          return usuario;
        });

      });
    });

    this.rolForm = this.fb.group({
      role: ['', Validators.required],
    });

  }

  CambioSelect(id: any) {
    console.log(id); // Aquí iría tu lógica al momento de seleccionar algo
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  cambiarEstado(id: any, data: any){
    console.log(id);
    this.authService.cambiarEstado(id, data);
  }

}
