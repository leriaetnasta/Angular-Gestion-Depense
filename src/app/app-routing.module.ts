import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepensesComponent } from './depenses/depenses.component';
import {EmployesComponent} from "./employes/employes.component";
import {DeplacementsComponent} from "./deplacements/deplacements.component";
import {ProjetsComponent} from "./projets/projets.component";
import {ClientsComponent} from "./clients/clients.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuardGuard} from "./guards/role-guard.guard";

const routes: Routes = [
    {path : '', redirectTo : "login",pathMatch:"full"},
  {path : 'depenses', component : DepensesComponent,  canActivate: [AuthGuard]},
  {path : 'employes', component : EmployesComponent, canActivate: [AuthGuard]},
  {path : 'deplacements', component : DeplacementsComponent, canActivate: [AuthGuard]},
  {path : 'projets', component : ProjetsComponent, canActivate: [AuthGuard]},
  {path : 'clients', component : ClientsComponent, canActivate: [AuthGuard]},
  {path : 'login', component : LoginComponent},
  {path : 'sign-up', component : SignupComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
