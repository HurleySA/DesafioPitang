
import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { ICreateVaccineSchedule, IUpdateVaccineSchedule } from "../helpers/dto";
import { VaccineScheduleService } from "../services/VaccineScheduleService";

const vaccineScheduleService = new VaccineScheduleService();

export class VaccineScheduleController {
    async deleteSchedule(request: Request, response: Response):Promise<Response> {
        try{
            const { schedule_id }  = request.params;
            const schedule = await vaccineScheduleService.deleteSchedule(schedule_id);
            return response.status(200).send(schedule);
        
          }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }else if(err instanceof Error){
                return response.status(500).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(500).json({error: errorMessage});
          }
    }
    async updateSchedule(request: Request, response: Response):Promise<Response>{
        try{
            const { schedule_id }  = request.params;
            const data: IUpdateVaccineSchedule = request.body;
            const schedule = await vaccineScheduleService.updateSchedule(schedule_id, data);
            return response.status(200).send(schedule);
            
      
          }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }else if(err instanceof Error){
                return response.status(500).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(500).json({error: errorMessage});
          }
    }
    async listVaccineSchedule(request: Request, response: Response): Promise<Response> {
        try{
            const schedules = await vaccineScheduleService.listVaccineSchedule();
            return response.status(200).send(schedules);
        }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }else if(err instanceof Error){
                return response.status(500).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(500).json({error: errorMessage});
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
            }else if(err instanceof Error){
                return response.status(500).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(500).json({error: errorMessage});
                
        }
    }

    
}