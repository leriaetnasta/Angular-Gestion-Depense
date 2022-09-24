import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Deplacement} from "../model/deplacement.model";
import {Client} from "../model/clients.model";

@Injectable({
  providedIn: 'root'
})
export class DeplacementService {

  constructor(private http:HttpClient) { }

  public getDeplacement(depId:number): Observable<Deplacement>{
    return this.http.get<Deplacement>(environment.backendHost+"/user/deplacements/"+depId);
  }
  public getDeplacements(): Observable<Array<Deplacement>>{
    return this.http.get<Array<Deplacement>>(environment.backendHost +"/user/deplacements")
  }
  public saveDeplacement(deplacement : Deplacement, idP:number,idE:number,idD:number):Observable<Object>{
    alert("savedeplacement is called")
    var data= JSON.stringify({deplacement:deplacement,idP:idP,idE:idE,idD:idD});
    return this.http.post<Object>(environment.backendHost+"/admin/deplacements" , data);
  }
  public deleteDeplacement(id : number){
    return this.http.delete(environment.backendHost+"/admin/deplacements/" + id);
  }
  public updateDeplacement(deplacementId : number,deplacement:Deplacement, idP:number,idE:number,idD:number):Observable<Object>{
    var data= JSON.stringify({deplacement:deplacement,idP:idP,idE:idE,idD:idD});
    return this.http.put<Object>(environment.backendHost+"/admin/deplacements/"+deplacementId,data);
  }

}
