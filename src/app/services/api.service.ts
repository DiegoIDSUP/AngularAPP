import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

	token;
  	url: string;
	public id;

	constructor(public _http: HttpClient){

		this.url = "http://ec2-3-93-25-99.compute-1.amazonaws.com/api/v1/"; 
	}


	login(user): Observable<any>{
		
		//let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'rest-auth/login/' , user, {headers: headers});
	}

	create(user: User): Observable<any>{
		let params = JSON.stringify(user);
		// let body = {
		// 	name: user.name,
		// 	email: user.email,
		// 	password: user.password
		//   };
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+ this.token);
    	console.log(params);
		return this._http.post(this.url+'listar_alumnos/',params, {headers:headers});
	}

	
	getUsers():Observable<any>{

		this.token = localStorage.getItem('token');
		console.log(this.token);
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+this.token);
		console.log(this.token);

		return this._http.get(this.url+'listar_alumnos/', {headers:headers});
	}

	getUser(id):Observable<any>{
		//let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.url+'user/'+this.id);
	}

	updateUser(id, user: User): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+ this.token);
		return this._http.put(this.url+'alumno/'+id, params, {headers:headers});
	}

	flitrar(nombre:string): Observable<any>{

		this.token = localStorage.getItem('token');
		console.log(this.token);
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+this.token);
		console.log(this.token);console.log(nombre)

		return this._http.get(this.url+'filtro/'+nombre, {headers:headers});
	}

	flitrarApellido(nombre:string, apellidos:string): Observable<any>{

		this.token = localStorage.getItem('token');
		console.log(this.token);
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+this.token);
		console.log(this.token);

		return this._http.get(this.url+'filtro/'+nombre+'/'+apellidos, {headers:headers});
	}

	sendEmail(asunto:string, correo:string, mensaje:string): Observable<any>{

		this.token = localStorage.getItem('token');
		console.log(this.token);
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+this.token);
		console.log(this.token);

		return this._http.get(this.url+'correo/'+asunto+'/'+correo+'/'+mensaje, {headers:headers});
	}


	deleteUser(id, user:User): Observable<any>{
		
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+ this.token);
		return this._http.put(this.url+'alumno/'+id,params,{headers:headers});
	}

	getCarreras(): Observable<any>{
        this.token = localStorage.getItem('token');
		console.log(this.token);
		this.getToken();
		let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+ this.token);
		return this._http.get(this.url+'listar_carreras/', {headers:headers});
	}
*

	getToken(){
		let token = localStorage.getItem('token');
		console.log(token);
		// if (token != "undefined") {
		// 	this.token = token;
		// }else{
		// 	this.token = null
		// }
		return this.token;
	}
}
