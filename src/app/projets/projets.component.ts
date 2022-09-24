import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeDTO, Projet} from "../model/projet.model";
import {ProjetService} from "../services/projet.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Client} from "../model/clients.model";
import {DeplacementDTO} from "../model/depense.model";
import {Employe} from "../model/employe.model";
import {Deplacement} from "../model/deplacement.model";
import {DeplacementService} from "../services/deplacement.service";
import {EmployeService} from "../services/employe.service";
import {ClientService} from "../services/client.service";



@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  searchFormGroup!: FormGroup;
  projets$ !:Observable<Array<Projet>>;
  projet !:Observable<Projet>;
  errorObj: Object | undefined;
  errorMsg: String | undefined;
  UpdateProjetFormGroup!: FormGroup;
  AddProjetFormGroup!: FormGroup;
  AddClientToProjetFG!: FormGroup;
  employes$!:Observable<Array<Employe>>;
  deplacements$ !:Observable<Array<Deplacement>>;
  clients$!: Observable<Array<Client>>;
  constructor(private employeService:EmployeService,private deplacementService : DeplacementService,private clientService : ClientService,private projetService : ProjetService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup= this.fb.group({
          keyword : this.fb.control("")
        }
    );
    this.projets$=this.projetService.getProjets().pipe(
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

          ));
    this.employes$=this.employeService.getEmployes().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));
    this.deplacements$=this.deplacementService.getDeplacements().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ));

    this.AddProjetFormGroup= this.fb.group({
        titre:           this.fb.control(null,Validators.required),
        dateDebut:       this.fb.control(null,Validators.required),
        dateFin:         this.fb.control(null,Validators.required),
        montantTotal:    this.fb.control(null,Validators.required),
        idEmploye:    this.fb.control(null,Validators.required),
        idClient:    this.fb.control(null,Validators.required),
        idDeplacement:    this.fb.control(null,Validators.required),
          }

      )
      this.UpdateProjetFormGroup= this.fb.group({
              id : this.fb.control(null,Validators.required),
              titre:           this.fb.control(null,Validators.required),
              dateDebut:       this.fb.control(null,Validators.required),
              dateFin:         this.fb.control(null,Validators.required),
              montantTotal:    this.fb.control(null,Validators.required),
          idEmploye:    this.fb.control(null,Validators.required),
              idClient:    this.fb.control(null,Validators.required),
              idDeplacement:    this.fb.control(null,Validators.required),
          }

      )
      this.AddClientToProjetFG= this.fb.group({
          idClient:this.fb.control(null, Validators.required)
      })

  }

  handleSearch() {
    let k= this.searchFormGroup?.value.keyword; // ? si la valeur est differente de undefined
    this.projets$=this.projetService.searchProjet(k).pipe(
        catchError(erreur=> {
              this.errorMsg=erreur.message;
              return throwError(erreur);
            }

        ))
  }


    handleDeleteProjet(projet:Projet) {
        let conf=confirm("Vous voulez supprimer le projet "+ projet.titre +" ?");
        if(!conf) return;
        this.projetService.deleteProjet(projet.id).subscribe({
            next:(resp:Object) =>{
                this.projets$=this.projets$.pipe(map(data=>{
                        let index = data.indexOf(projet);
                        //donne l'index
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




    handleUpdateProjet(id:number) {
        let projet=this.UpdateProjetFormGroup?.value;
        let idE:number=this.UpdateProjetFormGroup?.value.idEmploye;
        let idD:number=this.UpdateProjetFormGroup?.value.idDeplacement;
        let idC:number=this.UpdateProjetFormGroup?.value.idClient;

        this.projetService.updateProjet(id,projet,idE,idD,idC).subscribe({
            next: data=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }

    handleGetProjet(id: number) {
        this.projet =this.projetService.getProjet(id).pipe(
            catchError(erreur=> {
                    this.errorMsg=erreur.message;
                    return throwError(erreur);
                }

            ))
    }


    handleAddClientToProjet(idProjet: number) {
        let idP:number=this.AddClientToProjetFG?.value.idProjet;
        this.projetService.AddClientToProjet(idProjet,idP).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }


    handleSaveProjet() {
        let projet=this.AddProjetFormGroup?.value;
        let idE:number=this.AddProjetFormGroup?.value.idEmploye;
        let idD:number=this.AddProjetFormGroup?.value.idDeplacement;
        let idC:number=this.AddProjetFormGroup?.value.idClient;
alert(idC +idE +idD)
        this.projetService.saveProjet(projet,idE,idD,idC).subscribe({
            next: data=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }
}
