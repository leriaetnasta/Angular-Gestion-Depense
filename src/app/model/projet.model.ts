import {DeplacementDTO} from "./depense.model";

export interface Projet {
    id:              number;
    titre:           string;
    dateDebut:       Date;
    dateFin:         Date;
    listDeplacement: DeplacementDTO[];
    listEmploye:     EmployeDTO[];
    montantTotal:    number;
    client: ClientDTO
}



export interface EmployeDTO {
    id:          number;
    nom:         string;
    prenom:      string;
    email:       string;
    departement: string;
    phoneNumber: string;
    matricule:   string;
}
export interface ClientDTO {
    id:          number;
    nom: string;
}
