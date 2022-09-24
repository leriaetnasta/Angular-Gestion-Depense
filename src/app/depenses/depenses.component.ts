import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Depense, ModeReglement, Status} from "../model/depense.model";
import {DepenseService} from "../services/depense.service";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {Deplacement} from "../model/deplacement.model";
import {DeplacementService} from "../services/deplacement.service";
import {Client} from "../model/clients.model";

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  AddDepenseFormGroup!: FormGroup;
  AddDeplacementDepenseFG!: FormGroup;
  UpdateDepenseFormGroup!: FormGroup;
  deplacement!:Observable<Deplacement>;
  searchFormGroup: FormGroup | undefined;
  depenses$ !:Observable<Array<Depense>>;
  depense$ !:Observable<Depense>;
  errorObj: Object | undefined;
  errorMsg: String | undefined;
  statusList = Object.values(Status);
  colors = [{ status: "ACCEPTE", color: "green" }, { status: "REJETE", color: "red" },
        { status: "PENDING", color: "yellow" }];
  modeReglementlist = Object.values(ModeReglement);
  deplacements$!:Observable<Array<Deplacement>>;
  constructor(private depenseService : DepenseService, private fb:FormBuilder, private deplacementService:DeplacementService) { }


  ngOnInit(): void { // methode s'excute au demarrage; au moment de chargement de component
    this.searchFormGroup= this.fb.group({
          keyword : this.fb.control("")
        }
    )
    this.depenses$=this.depenseService.getDepenses().pipe(
        catchError(erreur=> {
              this.errorMsg=erreur.message;
              return throwError(erreur);
            }

        ))
   this.AddDepenseFormGroup= this.fb.group({
          status: this.fb.control(null, [Validators.required]),
          montant: this.fb.control(null, [Validators.required]),
          modeReglement:     this.fb.control(null, [Validators.required]),
          titre:             this.fb.control(null, [Validators.required,Validators.minLength(4)]),
          pieceJustificative: this.fb.control(null),
          commentaire:       this.fb.control(null, [Validators.required]),
          idDeplacement:  this.fb.control(null, [Validators.required]),
        }
  )
      this.UpdateDepenseFormGroup= this.fb.group({
          id:this.fb.control(null, Validators.required),
          status: this.fb.control(null, [Validators.required]),
          montant: this.fb.control(null, [Validators.required]),
          modeReglement:     this.fb.control(null, [Validators.required]),
          titre:             this.fb.control(null, [Validators.required,Validators.minLength(4)]),
          pieceJustificative: this.fb.control(null),
          commentaire:       this.fb.control(null, [Validators.required]),
          idDeplacement:  this.fb.control(null, [Validators.required]),
          }

      )
      this.AddDeplacementDepenseFG= this.fb.group({
          idDeplacement:this.fb.control(null, Validators.required)
      })
    this.deplacements$=this.deplacementService.getDeplacements().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ))
  }

    handleSearch() {
        let k= this.searchFormGroup?.value.keyword; // ? si la valeur est differente de undefined
        this.depenses$=this.depenseService.searchDepense(k).pipe(
            catchError(erreur=> {
                    this.errorMsg=erreur.message;
                    return throwError(erreur);
                }

            ))
    }
    getColor(status:Status) {
       return this.colors.filter(item => item.status === status.toString())[0].color
       // could be better written, but you get the idea
      }
    handleSaveDepense() {
        let depense$=this.AddDepenseFormGroup?.value;
        let idD:number=this.AddDepenseFormGroup?.value.idDeplacement;

        this.depenseService.saveDepense(depense$,idD).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                console.log("error")
                console.log(err)
            }
        })
    }

    handleAddDeplacementDepense(idD : number) {
        let idDeplac: number = this.AddDeplacementDepenseFG?.value.idDeplacement;
        this.depenseService.AddDeplacementToDepense(idD, idDeplac).subscribe({
            next: () => {
                window.location.reload();
            }, error: err => {
                console.log(err)
            }
        })

    }
    handleDeleteDepense(depense:Depense) {
        let conf=confirm("Vous voulez supprimer le depense "+ depense.id +" ?");
        if(!conf) return;
        this.depenseService.deleteDepense(depense.id).subscribe({
            next:(resp:Object) =>{
                this.depenses$=this.depenses$.pipe(map(data=>{
                        let index = data.indexOf(depense);
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




    handleUpdateDepense(id:number) {
        let depense$=this.UpdateDepenseFormGroup?.value;
        let idDeplac: number = this.UpdateDepenseFormGroup?.value.idDeplacement;

        //stocker tt les données de formulaire dans la variable client
        this.depenseService.updateDepense(id,depense$,idDeplac).subscribe({
            next: data=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }

    handleGetDepense(id: number) {
        this.depense$=this.depenseService.getDepense(id).pipe(
            catchError(erreur=> {
                    this.errorMsg=erreur.message;
                    return throwError(erreur);
                }

            ))
    }


}
