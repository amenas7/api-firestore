import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
      let NuevousuarioAntes = {
        email: respuesta.user?.email,
        password: password,
        rol: "Bodeguero",
        nombre: respuesta.user?.displayName,
        estado: 1
      }
      let registro = await this.firestore.collection("usuarios").add(NuevousuarioAntes);
      //actualizando registro agregando el id
      let Nuevousuario = {
        email: respuesta.user?.email,
        password: password,
        rol: "Bodeguero",
        nombre: respuesta.user?.displayName,
        estado: 1,
        id: registro.id,
        imagen_google: respuesta.user?.photoURL
      }
      this.firestore.collection("usuarios").doc(registro.id).set(Nuevousuario);

          return true;
      }
      else
      return false;
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }

  async getAll(){
    try {
      return await this.firestore.collection("usuarios").snapshotChanges();
    } catch (error) {
      console.log("error en getAll: " + error);
      return null;
    }
  }

  async getById(id: any){
    try {
      return await this.firestore.collection("usuarios").snapshotChanges();
    } catch (error) {
      console.log("error en getById: " + error);
      return null;
    }
  }

  async update(id: any, data:any){
    try {
      return await this.firestore.collection("usuarios").doc().set(data);
    } catch (error) {
      console.log("error en update: " + error);
      return null;
    }
  }

  async cambiarEstado(id: any, data: any){
    var estado_seteado = data.estado == 0 ? 1 : 0;
    console.log(estado_seteado);
    console.log(data);
    let nuevoUsuario = {
      email: data.email,
      password: data.password,
      rol: data.rol,
      nombre: data.nombre,
      estado: estado_seteado,
      id: data.id,
      imagen_google: data.imagen_google
    }
    try {
      return await this.firestore.collection("usuarios").doc(id).set(nuevoUsuario);
    } catch (error) {
      console.log("error en cambiar estado: " + error);
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
