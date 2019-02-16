import { Group } from './Group';

export interface User {
    id: number;
    nome: string;
    email: string;
    age: number;
    cidade: string;
    estado: string;
    vistoEm: Date;
    criadoEm: Date;
    grupos?: Group[];
}
