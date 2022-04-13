
import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { VaccineScheduleService } from "../services/VaccineScheduleService";
interface ICreateVaccineSchedule {
    "name": string;
    "born_date": Date;
    "vaccination_date": Date;

}

interface IUpdateVaccineSchedule {
    "name"?: string;
    "born_date"?: Date;
    "vaccination_date"?: Date;
    "vaccinated": boolean,
	"conclusion": string,
}
const vaccineScheduleService = new VaccineScheduleService();

export class VaccineScheduleController {
    async updateSchedule(request: Request, response: Response):Promise<Response>{
        try{
            const { schedule_id }  = request.params;
            const data: IUpdateVaccineSchedule = request.body;
            const schedule = await vaccineScheduleService.updateSchedule(schedule_id, data);
            return response.status(200).send(schedule);
            
      
          }catch(err){
            return response.status(400).json({ error: err.message })
          }
    }
    async listVaccineSchedule(request: Request, response: Response): Promise<Response> {
        try{
            const schedules = await vaccineScheduleService.listVaccineSchedule();
            return response.status(200).send(schedules);
        }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }
                return response.status(500).json({error: err, message: err.message});
        }
    }
    async createVaccineSchedule(request: Request, response: Response): Promise<Response> {
        try{
            const  { name, born_date, vaccination_date }: ICreateVaccineSchedule = request.body;
            const vaccineSchedule = await vaccineScheduleService.createVaccineSchedule({name, born_date, vaccination_date})
            return response.status(201).send(vaccineSchedule);
        }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }
                return response.status(500).json({error: err, message: err.message});
        }
    }

    
}