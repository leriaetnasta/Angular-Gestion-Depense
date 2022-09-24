import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client,  ProjetDTO} from "../model/clients.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http:HttpClient) { }

  public getClients(): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost +"/user/clients")
  }
  public searchClient(keyword : string):Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+"/user/clients/search?keyword="+keyword);
  }
  public saveClient(client : Client, idP:number):Observable<Object>{
    var data=JSON.stringify({client: client , idP: idP})
    console.log(data)
    return this.http.post<Object>(environment.backendHost+"/admin/clients" , data);
  }
  public deleteClient(id : number){
    return this.http.delete(environment.backendHost+"/admin/clients/" + id);
  }
  /*public getClient(clientId:number, page: number, size : number){
    return this.http.get(environment.backendHost +"/clients/"+clientId+"?page="+page+"&size="+size);
  }*/

  public getClient(clientId : number):Observable<Client>{
    return this.http.get<Client>(environment.backendHost+"/user/clients/"+clientId);
  }
  public updateClient(clientId : number,client:Client,idP: number):Observable<Client>{
    var data=JSON.stringify({client: client , idP: idP})
    console.log(data)

    return this.http.put<Client>(environment.backendHost+"/admin/clients/update/"+clientId,data);
  }

  public AddProjetToClient(idClient: number, idProjet: number) {
    alert("adding "+ idProjet + " to "+ idClient);
    return this.http.put<Array<number>>(environment.backendHost+"/admin/clients/"+idClient+"/addprojets" , [idClient,idProjet]);

  }

}
