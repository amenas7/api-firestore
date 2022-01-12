import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore
    ) { }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en registro: ", err);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {
    try {

      //buscar dominio antes del login con modal de google
      let respuesta = await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      let email_buscar = respuesta.user?.email;

      // esta es la palabra a buscar
      let termino = "@vuela.bo";
      // para buscar la palabra hacemos
      let posicion = email_buscar?.indexOf(termino);
      if (posicion !== -1){
      // si encuentra -1 significa que encontró el valor buscado en el correo
      let Nuevousuario = {
        email: respuesta.user?.email,
        password: password,
        rol: "simple",
        nombre: respuesta.user?.displayName
      }
      this.firestore.collection("usuarios").add(Nuevousuario);
          return true;
      }
      else
      return false;
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logout() {
    this.afauth.signOut();
  }

  // async crearUsuarioFirestore( collection: any, data: any ){
  //   return await this.firestore.collection(collection).add(data);
  // }

}
