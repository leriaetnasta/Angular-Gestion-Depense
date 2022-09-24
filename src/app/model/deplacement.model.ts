import {ProjetDTO} from "./clients.model";
import {EmployeDTO} from "./projet.model";
import {DeplacementDTO, Status} from "./depense.model";

export interface Deplacement {
    id:          number;
    adresse:     string;
    dateDepart:  Date;
    dateRetour:  Date;
    listdepense: DepenseDTO[];
    employe:     EmployeDTO;
    projet:      ProjetDTO;
}
export interface DepenseDTO {
    id:                 number;
    status:             Status;
    montant:            number;
    modeReglement:      string;
    titre:              string;
    pieceJustificative: string;
    commentaire:        string;
}
