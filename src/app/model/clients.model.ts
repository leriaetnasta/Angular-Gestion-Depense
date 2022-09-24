export interface Client {
    id:         number;
    nom:        string;
    listProjet: ProjetDTO[];
}

export interface ProjetDTO {
    id:           number;
    titre:        string;
    dateDebut:    Date;
    dateFin:      Date;
    montantTotal: number;
}
