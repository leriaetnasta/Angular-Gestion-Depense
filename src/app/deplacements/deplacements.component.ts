import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {DepenseDTO, Deplacement} from "../model/deplacement.model";
import {DeplacementService} from "../services/deplacement.service";
import {EmployeDTO, Projet} from "../model/projet.model";
import {ProjetDTO} from "../model/clients.model";
import {Employe} from "../model/employe.model";
import {EmployeService} from "../services/employe.service";
import {ProjetService} from "../services/projet.service";
import {DepenseService} from "../services/depense.service";
import {Depense} from "../model/depense.model";

@Component({
  selector: 'app-deplacements',
  templateUrl: './deplacements.component.html',
  styleUrls: ['./deplacements.component.css']
})
export class DeplacementsComponent implements OnInit {
  searchFormGroup: FormGroup | undefined;
  deplacements$ !:Observable<Array<Deplacement>>;
  employes$!:Observable<Array<Employe>>;
  deplacement!:Observable<Deplacement>;
  deplacementR!:Observable<Deplacement>;
  errorObj: Object | undefined;
  errorMsg: String | undefined;
  UpdateDeplacementFormGroup!: FormGroup;
  AddDeplacementFormGroup!: FormGroup;
  projets$!:Observable<Array<Projet>>;
  depenses$!:Observable<Array<Depense>>;
  constructor(private deplacementService : DeplacementService, private fb:FormBuilder,private employeService:EmployeService, private projetService:ProjetService,private depenseService:DepenseService) { }


  ngOnInit(): void { // methode s'excute au demarrage; au moment de chargement de component
    this.searchFormGroup= this.fb.group({
          keyword : this.fb.control("")
        }
    )
    this.UpdateDeplacementFormGroup= this.fb.group({
      id:this.fb.control(null, Validators.required),
      adresse : this.fb.control(null, [Validators.required,Validators.minLength(10)]),
      dateDepart : this.fb.control(null, Validators.required),
      dateRetour : this.fb.control(null, Validators.required),
      idDepense: this.fb.control(null, Validators.required),
      idEmploye:    this.fb.control(null, Validators.required),
      idProjet:     this.fb.control(null, Validators.required),
  })


    this.deplacements$=this.deplacementService.getDeplacements().pipe(
        catchError(erreur=> {
              this.errorMsg=erreur.message;
              return throwError(erreur);
            }

        ));
      this.projets$=this.projetService.getProjets().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ))
     this.employes$=this.employeService.getEmployes().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));
      this.depenses$=this.depenseService.getDepenses().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));

    this.AddDeplacementFormGroup= this.fb.group({
      adresse : this.fb.control(null, [Validators.required,Validators.minLength(10)]),
      dateDepart : this.fb.control(null, Validators.required),
      dateRetour : this.fb.control(null, Validators.required),
      idDepense: this.fb.control(null, Validators.required),
      idEmploye:    this.fb.control(null, Validators.required),
      idProjet:     this.fb.control(null, Validators.required),
      }

  )

  }
    handleSearch() {
        let k:number= this.searchFormGroup?.value.keyword; // ? si la valeur est differente de undefined
        this.deplacementR=this.deplacementService.getDeplacement(k).pipe(
            catchError(erreur=> {
                    this.errorMsg=erreur.message;
                    return throwError(erreur);
                }

            ))
    }
  handleGetDeplacement(id: number) {
      this.deplacement=this.deplacementService.getDeplacement(id).pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ))
   
  }

  handleUpdateDeplacement(id:number) {
    let deplacement=this.UpdateDeplacementFormGroup?.value;
      let idP:number=this.UpdateDeplacementFormGroup?.value.idProjet;
      let idE:number=this.UpdateDeplacementFormGroup?.value.idEmploye;
      let idD:number=this.UpdateDeplacementFormGroup?.value.idDepense;
    //stocker tt les données de formulaire dans la variable client
    this.deplacementService.updateDeplacement(id,deplacement,idP,idE,idD).subscribe({
        next: data=>{
            window.location.reload();
        },error:err => {
            console.log(err)
        }
    })
}
handleDeleteDeplacement(dep:Deplacement) {
  let conf=confirm("Vous voulez supprimer le deplacement "+ dep.id +" ?");
      if(!conf) return;
  this.deplacementService.deleteDeplacement(dep.id).subscribe({
      next:(resp:Object) =>{
          this.deplacements$=this.deplacements$.pipe(map(data=>{
              let index = data.indexOf(dep);
              //donne l'index du client
              data.slice(index, 1);
              //supprimer 1 index
              return data;
              })
          );
      },error:err => {
          console.log(err);
      }
  })
}
handleSaveDeplacement() {
  let deplacement=this.AddDeplacementFormGroup?.value;
    let idP:number=this.AddDeplacementFormGroup?.value.idProjet;
    let idE:number=this.AddDeplacementFormGroup?.value.idEmploye;
    let idD:number=this.AddDeplacementFormGroup?.value.idDepense;

alert("handle save deplacement is called");

    //stocker tt les données de formulaire dans la variable client
  this.deplacementService.saveDeplacement(deplacement,idP,idE,idD).subscribe({
      next: data=>{
          window.location.reload();
      },error:err => {
          console.log(err)
      }
  })
}


}


