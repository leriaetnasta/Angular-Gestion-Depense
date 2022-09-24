import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeService} from "../services/employe.service";
import {catchError, Observable, throwError} from "rxjs";
import {Departement, Employe} from "../model/employe.model";
import {Client, ProjetDTO} from "../model/clients.model";
import {Projet} from "../model/projet.model";
import {ProjetService} from "../services/projet.service";
import {DeplacementDTO, ModeReglement} from "../model/depense.model";
import {DeplacementService} from "../services/deplacement.service";
import {Deplacement} from "../model/deplacement.model";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  size:number=5;
  errorObj: Object | undefined;
  errorMsg: String | undefined;
  employes$!:Observable<Array<Employe>>;
    employe$!:Observable<Employe>;

    employeObservable$!:Observable<Employe>;
  projets$!:Observable<Array<Projet>>;
  errorMessage!: string;
  deplacements$!:Observable<Array<Deplacement>>;
  AddEmployeFormGroup!:FormGroup;
  UpdateEmployeFormGroup!:FormGroup;
  departements = Object.values(Departement);
    clients$!: Observable<Array<Client>>;

    constructor(private fb:FormBuilder, private clientService : ClientService,private employeService:EmployeService,private projetService:ProjetService, private deplacementService: DeplacementService) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group(
        {
          employeId: this.fb.control('')
        }
    );
     this.employes$=this.employeService.getEmployes().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));
     this.clients$=this.clientService.getClients().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ))
      this.projets$=this.projetService.getProjets().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));
      this.AddEmployeFormGroup= this.fb.group({
          nom: this.fb.control(null, [Validators.required]),
          prenom: this.fb.control(null, [Validators.required]),
          email:     this.fb.control(null, [Validators.required]),
          departement:             this.fb.control(null, Validators.required),
          phoneNumber: this.fb.control(null),
          matricule:       this.fb.control(null, [Validators.required]),
          idProjet:  this.fb.control(null, [Validators.required]),
          idDeplacement:  this.fb.control(null, [Validators.required]),

          }
      );
      this.UpdateEmployeFormGroup= this.fb.group({
          id:this.fb.control(null, [Validators.required]),
          nom: this.fb.control(null, [Validators.required]),
          prenom: this.fb.control(null, [Validators.required]),
          email:     this.fb.control(null, [Validators.required]),
          departement:             this.fb.control(null, Validators.required),
          phoneNumber: this.fb.control(null),
          matricule:       this.fb.control(null, [Validators.required]),
          idProjet:  this.fb.control(null, [Validators.required]),
          idDeplacement:  this.fb.control(null, [Validators.required]),

          }
      );
      this.deplacements$=this.deplacementService.getDeplacements().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));

  }

  handleSearchEmploye() {
    let empId:number=this.searchFormGroup?.value.employeId;
    this.employeObservable$=this.employeService.getEmploye(empId).pipe(
        catchError(err => {
          this.errorMessage=err.message;
          return throwError(err);
        })
    );
  }

    handleGetEmploye(id: number) {
        this.employeObservable$=this.employeService.getEmploye(id).pipe(
            catchError(err => {
                this.errorMessage=err.message;
                return throwError(err);
            })
        );
        
    }

    handleDeleteEmploye(emp: Employe) {
        
    }
    handleSaveEmploye() {
        let employe$=this.AddEmployeFormGroup?.value;
        let idP:number=this.AddEmployeFormGroup?.value.idProjet;
        let idD:number=this.AddEmployeFormGroup?.value.idDeplacement;
        this.employeService.saveEmploye(employe$,idP,idD).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                console.log("error")
                console.log(err)
            }
        })
    }
    handleUpdateEmploye(id:number) {
        let employe$=this.UpdateEmployeFormGroup?.value;

        let idP:number=this.UpdateEmployeFormGroup?.value.idProjet;
        let idD:number=this.UpdateEmployeFormGroup?.value.idDeplacement;
        this.employeService.updateEmploye(id,employe$,idP,idD).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                console.log("error")
                console.log(err)
            }
        })
    }
}
