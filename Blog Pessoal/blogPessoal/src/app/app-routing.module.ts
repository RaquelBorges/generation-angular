import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"cadastrar", component: CadastrarComponent},
  {path:"", redirectTo: "login", pathMatch: "full"},
  {path:"home", component: HomeComponent},
  {path:"tema", component: TemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
