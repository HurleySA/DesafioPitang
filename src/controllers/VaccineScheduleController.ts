
import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { VaccineScheduleService } from "../services/VaccineScheduleService";
interface ICreateVaccineSchedule {
    "name": string;
    "born_date": Date;
    "vaccination_date": Date;

}
const vaccineScheduleService = new VaccineScheduleService();

export class VaccineScheduleController {
    async createVaccineSchedule(request: Request, response: Response): Promise<Response> {
        try{
            const  { name, born_date, vaccination_date }: ICreateVaccineSchedule = request.body;
            const vaccineSchedule = await vaccineScheduleService.createVaccineSchedule({name, born_date, vaccination_date})
            return response.status(201).send(vaccineSchedule);
        }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }
                return response.status(500).json({error: "Something went wrong."});
        }
    }

    
}