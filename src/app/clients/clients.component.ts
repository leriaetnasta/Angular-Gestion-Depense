import {Component, NgModule, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Client, ProjetDTO} from '../model/clients.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Projet} from "../model/projet.model";
import {ProjetService} from "../services/projet.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
    clients$!: Observable<Array<Client>>;
    client: Observable<Client>| undefined;
    projet$ !:Observable<Array<Projet>>;
    errorObj: Object | undefined;
    errorMsg: String | undefined;
    searchFormGroup!: FormGroup;
    AddClientFormGroup!: FormGroup;
    AddProjetToClientFG!: FormGroup;
    UpdateClientFormGroup!: FormGroup;
    idProjet: number | undefined;

    constructor(private projetService : ProjetService,private clientService : ClientService, private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
      // methode s'excute au demarrage; au moment de chargement de component

      this.searchFormGroup= this.fb.group({
      keyword : this.fb.control("")
    }


    )
    this.clients$=this.clientService.getClients().pipe(
        catchError(erreur=> {
          this.errorMsg=erreur.message;
          return throwError(erreur);
        }

    ));
      this.projet$=this.projetService.getProjets().pipe(
          catchError(erreur=> {
                  this.errorMsg=erreur.message;
                  return throwError(erreur);
              }

          ))

      this.UpdateClientFormGroup= this.fb.group({
              id:this.fb.control(null, Validators.required),
              nom : this.fb.control(null, [Validators.required,Validators.minLength(4)]),
              idP: this.fb.control(null, Validators.required),

          }

      )
      this.AddClientFormGroup= this.fb.group({
              nom : this.fb.control(null, [Validators.required,Validators.minLength(4)]),
              idP: this.fb.control(null, Validators.required),

          }

      )

      this.AddProjetToClientFG= this.fb.group({
          idProjet:this.fb.control(null, Validators.required)
      })

  }

  handleSearch() {
    let k= this.searchFormGroup?.value.keyword; // ? si la valeur est differente de undefined
    this.clients$=this.clientService.searchClient(k).pipe(
        catchError(erreur=> {
              this.errorMsg=erreur.message;
              return throwError(erreur);
            }

        ))

  }

    handleDeleteClient(client:Client) {
        let conf=confirm("Vous voulez supprimer le client "+ client.nom +" ?");
            if(!conf) return;
        this.clientService.deleteClient(client.id).subscribe({
            next:(resp:Object) =>{
                this.clients$=this.clients$.pipe(map(data=>{
                    let index = data.indexOf(client);
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




    handleUpdateClient(id:number) {
        let client=this.UpdateClientFormGroup?.value;
        let idP:number=this.UpdateClientFormGroup?.value.idP;

        //stocker tt les données de formulaire dans la variable client
        this.clientService.updateClient(id,client,idP).subscribe({
            next: data=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }

    handleGetClient(id: number) {
        this.client=this.clientService.getClient(id).pipe(
            catchError(erreur=> {
                    this.errorMsg=erreur.message;
                    return throwError(erreur);
                }

            ))
    }


    handleAddProjetClient(idClient : number) {
        let idP:number=this.AddProjetToClientFG?.value.idProjet;
        this.clientService.AddProjetToClient(idClient,idP).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                console.log(err)
            }
        })
    }


    handleSaveClient() {
        let client=this.AddClientFormGroup?.value;
        let idP:number=this.AddClientFormGroup?.value.idP;

        //stocker tt les données de formulaire dans la variable client
        this.clientService.saveClient(client,idP).subscribe({
            next: ()=>{
                window.location.reload();
            },error:err => {
                 alert("You do not have the required role or privilege to complete this operation." +
                     "Please contact your administrator to get necessary access");

                this.router.navigate(['depense']);
                console.log(err)
            }



        })
    }


}
