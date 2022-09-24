import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projet} from "../model/projet.model";
import {environment} from "../../environments/environment";
import {Client} from "../model/clients.model";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http:HttpClient) { }

  public getProjets(): Observable<Array<Projet>>{
    return this.http.get<Array<Projet>>(environment.backendHost +"/user/projets")
  }
  public searchProjet(keyword : string):Observable<Array<Projet>>{
    return this.http.get<Array<Projet>>(environment.backendHost+"/user/projets/search?keyword="+keyword);
  }

  public saveProjet(projet : Projet,idE : number,idD : number,idC : number):Observable<Projet>{
    var data=JSON.stringify({projet: projet , idE: idE, idD: idD, idC: idC})
    console.log(data)
    return this.http.post<Projet>(environment.backendHost+"/admin/projets" , data);
  }
  public deleteProjet(id : number){
    return this.http.delete(environment.backendHost+"/admin/projets/" + id);
  }


  public getProjet(projetId : number):Observable<Projet>{
    return this.http.get<Projet>(environment.backendHost+"/user/projets/"+projetId);
  }
  public updateProjet(projetId : number,projet:Projet,idE : number,idD : number,idC : number):Observable<Projet>{
    var data=JSON.stringify({projetId:projetId,projet: projet , idE: idE, idD: idD, idC: idC})
    console.log(data);
    return this.http.put<Projet>(environment.backendHost+"/admin/projets/"+projetId,data);
  }

  public AddClientToProjet( idProjet: number,idClient: number) {
    alert("to "+ idProjet + " adding "+ idClient);
    return this.http.put<Array<number>>(environment.backendHost+"/admin/projets/"+idProjet+"/addclient" , [idProjet,idClient]);

  }



}
