import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: 'home', component: UsersComponent},
	{path: 'login', component: LoginComponent},
     {path: 'crear', component: RegisterComponent},
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
