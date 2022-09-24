import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Depense} from "../model/depense.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http:HttpClient) { }

  public getDepenses(): Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(environment.backendHost +"/user/depenses");
  }
  public searchDepense(keyword : string):Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(environment.backendHost+"/user/depenses/search?keyword="+keyword);
  }
  public saveDepense(depense : Depense, idD:number):Observable<Object>{
    var data=JSON.stringify({depense: depense, idD: idD})
    return this.http.post<Object>(environment.backendHost+"/admin/depenses" ,data );
  }
  public sendImg(id:number, fd : FormData):Observable<FormData>{
    return this.http.post<FormData>(environment.backendHost+"/imageRecu/{id}"+id , fd);
  }

  AddDeplacementToDepense(idD: number, idDeplac: number) {
    return this.http.put<Array<number>>(environment.backendHost+"/admin/depenses/"+idD+"/addDeplacement" , [idD,idDeplac]);

  }



  public deleteDepense(id : number){
    return this.http.delete(environment.backendHost+"/admin/depenses/" + id);
  }

  public getDepense(id : number):Observable<Depense>{
    return this.http.get<Depense>(environment.backendHost+"/user/depenses/"+id);
  }
  public updateDepense(depenseId : number,depense:Depense, idDep:number):Observable<Object>{
    return this.http.put<Object>(environment.backendHost+"/admin/depenses/"+depenseId,JSON.stringify({depense: depense, idDep: idDep}));
  }

}
