import { Necesidad } from "./necesidad";

export class Curso {
    id?:number;
    name:string;
    code:string;
    career_id:number;
    course_period_id:number;
    user_id:number;
    free:number;
    cost:number;
    course_type_id:number;
    modality_id:string;
    hours_duration:number;
    capacity:number;
    place:string;
    participant_type_id:number;
    resume:string;
}