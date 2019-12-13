import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: User[];
  user: User;
  carreras:any[];

  constructor(
    private apiService: ApiService,private _router: Router
  ) {
    this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(response => {
      console.log(response);
      this.users = response;
      this.edit = 'false';
      this.getCarreras();
    })
    
    
  }

  async renameCarreras(){
    this.users.forEach(async user => {
      console.log(parseInt(user.carrera));
      let index = this.carreras.findIndex(i => i.id === user.carrera);
      user.carrera = await this.carreras[index].nombre_carrera;
    })
  }

  async getCarreras(){
    this.apiService.getCarreras().subscribe(async response => {
		  
      this.carreras = await response;
      console.log(response);
      this.renameCarreras();
    })
    
  }

  menucrear(){
      this._router.navigate(['/crear']);
  }

  logout(){
    this._router.navigate(['/']);
  }

  setCarrera(id){
    this.user.carrera = id;
  }

  edit = 'false';
  msn = 'false';
  item
  editUser(id) {
      this.edit = 'true';

      this.item = this.users.find(i => i.id === id);
      let index = this.users.findIndex(i => i.id === id);
      this.user.nombre = this.users[index].nombre;
      this.user.apellidos = this.users[index].apellidos;
      this.user.edad = this.users[index].edad;
      this.user.direccion = this.users[index].direccion;
      this.user.carrera = this.users[index].carrera;
      this.user.sexo = this.users[index].sexo;
      this.user.delet = 'false';
  }

  closeEdit(){
    this.edit = 'false';
  }

  editNow() {
    this.apiService.updateUser(this.item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  deleteUser(id) {
    console.log(this.users);
    //this.users.find('id':id);
    let item = this.users.find(i => i.id === id);
    let index = this.users.findIndex(i => i.id === id);
    this.user.nombre = this.users[index].nombre;
    this.user.apellidos = this.users[index].apellidos;
    this.user.edad = this.users[index].edad;
    this.user.direccion = this.users[index].direccion;
    this.user.carrera = '1';
    this.user.sexo = this.users[index].sexo;
    this.user.delet = 'true';
    this.apiService.deleteUser(item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }
  busqueda: string;
  usersAux: User[];

  checkfilt(){
    let nombres =this.busqueda.split(' ')
    let nombre = nombres[0]
    let apellido=''
    console.log('nombre: '+nombre+' / apellido: '+apellido)
    for (var i = 1; i < nombres.length; i++) {
      let check = this.users.filter(users => {
        return users.nombre.includes(nombre+' '+nombres[i]);
      })
      if(check.length>0){
          nombre=nombre+' '+nombres[i];
      }else{
        apellido=nombres[i]
        for (var j = i+1; j < nombres.length; j++){
            apellido=apellido+' '+nombres[i];
        }
        i = nombres.length;
      }
    }
    console.log('nombre: '+nombre+' / apellido: '+apellido)
    if(apellido.length>0){
        console.log('filtro por apellido')
        this.filtrarApellidos(nombre,apellido)
    }else{
        console.log('filtro')
        this.filtrar()
    }
  }

  async filtrar(){
    let nombre=await this.busqueda.replace(' ','_')
    while(nombre.indexOf(' ') != -1){
      nombre=await nombre.replace(' ','_')
    }
    if (nombre == '') {
      this.ngOnInit();
    }else{
      this.apiService.flitrar(nombre).subscribe(async response => {
        this.users = await response;
      })
      this.getCarreras();
    }
  }
  asunto: string;
  correo: string;
  mensaje: string;

  createemail(){
    this.msn = 'true';
  }

  closeemail(){
    this.msn = 'false';
  }
  sendmail(){
    let motivo=this.asunto
    while(motivo.indexOf(' ') != -1){
      motivo= motivo.replace(' ','_')
    }
    let mail=this.correo
    while(mail.indexOf('@') != -1){
      mail= mail.replace('@','arroba')
    }

    while(mail.indexOf('.') != -1){
      mail= mail.replace('.','punto')
    }
    let text=this.mensaje
    while(text.indexOf(' ') != -1){
      text= text.replace(' ','_')
    }
    console.log(motivo)
    console.log(mail)
    console.log('-------------')
    console.log(text)
    this.apiService.sendEmail(motivo,mail,text).subscribe( response => {
        this.users =  response;
      })
    this.msn = 'false';
  }

  filtrarApellidos(nombres,apellidos){
    while(nombres.indexOf(' ') != -1){
      nombres=nombres.replace(' ','_')
    }
    while(apellidos.indexOf(' ') != -1){
      apellidos=apellidos.replace(' ','_')
    }
    console.log('nombre: '+nombres+' / apellido: '+apellidos)
    this.apiService.flitrarApellido(nombres,apellidos).subscribe(response => {
      console.log(response);
      this.users = response;
    })
  }


}
