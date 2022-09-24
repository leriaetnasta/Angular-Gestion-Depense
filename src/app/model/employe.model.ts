import {ProjetDTO} from "./clients.model";
import { DeplacementDTO} from "./depense.model";

export interface Employe {
    id:          number;
    nom:         string;
    prenom:      string;
    email:       string;
    departement:     Departement;
    phoneNumber: string;
    matricule:   string;
    projet:          ProjetDTO[];
    listDeplacement: DeplacementDTO[];
}
export enum Departement {
    IT = "IT",
    COMMERCE="COMMERCE",
    MARKETING="MARKETING",
    FINANCE="FINANCE",
    ACHAT="ACHAT",
    RH="RH"

}
