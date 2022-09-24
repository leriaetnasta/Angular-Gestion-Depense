import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Employe} from "../model/employe.model";
import {Client} from "../model/clients.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http:HttpClient) { }

  public getEmploye(empId:number): Observable<Employe>{
    return this.http.get<Employe>(environment.backendHost+"/user/employes/"+empId);
  }

  public saveEmploye(employe : Employe,idP:number,idD:number):Observable<Object>{
    let data=JSON.stringify({employe:employe,idP:idP,idD:idD});
    console.log(data);
    return this.http.post<Object>(environment.backendHost+"/admin/employes" , data);
  }
  public updateEmploye(id:number,employe : Employe,idP:number,idD:number):Observable<Object>{
    let data=JSON.stringify({employe:employe,idP:idP,idD:idD});
    console.log(data);
    return this.http.put<Object>(environment.backendHost+"/admin/employes/"+ id, data);
  }





  public getEmployes(): Observable<Array<Employe>>{
    return this.http.get<Array<Employe>>(environment.backendHost +"/user/employes")
  }
}
