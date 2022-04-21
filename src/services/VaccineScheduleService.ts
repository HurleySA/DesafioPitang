
import { VaccineSchedule } from "@prisma/client";
import { endOfDay, startOfDay, subHours } from "date-fns";
import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
import { ICreateVaccineSchedule, IUpdateVaccineSchedule } from "../helpers/dto";
import { schemaCreate, schemaUpdate } from "../helpers/schemas";

let availableHours: number[] = [];
for(let i = +process.env.FIRST_HOUR_SERVICE!; i <= +process.env.LAST_HOUR_SERVICE!; i++){
    availableHours.push(i);
}


class VaccineScheduleService {
    async deleteSchedule(schedule_id: string): Promise<VaccineSchedule> {
        const schedule = await prismaClient.vaccineSchedule.findUnique({
            where:{
                id:schedule_id
            }
        })
        if(!schedule){
            throw new AppError("Schedule not found.", 404);
        }

        const newSchedule = await prismaClient.vaccineSchedule.delete({
            where: { id: schedule_id }
        })
        return newSchedule;
    }
    async updateSchedule(schedule_id: string, {name, born_date, vaccination_date, vaccinated, conclusion}:IUpdateVaccineSchedule): Promise<VaccineSchedule> {
        const schedule = await prismaClient.vaccineSchedule.findUnique({
            where:{
                id:schedule_id
            }
        })
        if(!schedule){
            throw new AppError("Schedule not found.", 404);
        }
        const validation = schemaUpdate.validate({name, born_date, vaccination_date, vaccinated, conclusion}, {
            abortEarly:false
        });
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }
        let vaccinationDate = vaccination_date;
        if(vaccination_date && born_date)this.verifyDates(vaccination_date, born_date);
        if(vaccination_date){
            vaccinationDate = new Date(vaccination_date)
            vaccinationDate.setMinutes(0)
            vaccinationDate.setSeconds(0)
            vaccinationDate.setMilliseconds(0)
            await this.verifyHasVaccation(vaccinationDate);
        } 
        
        const newSchedule = await prismaClient.vaccineSchedule.update({
            where: { id: schedule_id },
            data: { 
                name,
                born_date,
                vaccination_date: vaccinationDate,
                vaccinated,
                conclusion: vaccinated ? conclusion : null,
            },
        })
        return newSchedule;
    }
    
    async listVaccineSchedule():Promise<VaccineSchedule[]> {
        const schedules = await prismaClient.vaccineSchedule.findMany({
            orderBy: {
                vaccination_date: 'asc'
            }
        })
        return schedules;
    }
    async createVaccineSchedule({ name, born_date, vaccination_date }: ICreateVaccineSchedule): Promise<VaccineSchedule>{
        const validation = schemaCreate.validate({ name, born_date, vaccination_date },{
            abortEarly:false
        })
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }
        const vaccinationDate = new Date(vaccination_date)
        this.verifyDates(vaccinationDate, born_date);
        vaccinationDate.setMinutes(0,0,0)
        
        await this.verifyHasVaccation(vaccinationDate);

        const vaccineSchedule = await prismaClient.vaccineSchedule.create({
            data:{
                name,
                born_date,
                vaccination_date: vaccinationDate,
            }
        })    
        return vaccineSchedule;
    }

    async verifyHasVaccation(vaccinationDate: Date): Promise<void>{
        const vaccination = new Date(vaccinationDate);
        const schedulesByHours = await prismaClient.vaccineSchedule.findMany({
            where: {
                vaccination_date: vaccination
            }
        })
    
        if(schedulesByHours.length >= +process.env.MAX_SCHEDULES_BY_HOUR!){
            throw new AppError("Already have 2 reservations at this hour.", 403)
        }
        const begin = (subHours(startOfDay(vaccination), 3))
        const end = (subHours(endOfDay(vaccination), 3))
        const schedules = await prismaClient.vaccineSchedule.findMany({
            where:{
                vaccination_date:{
                    gte: begin,
                    lt: end
                }
            }
        });
        if(schedules.length >= +process.env.MAX_SCHEDULES_BY_DAY!){
            throw new AppError("Already have 20 reservations at this day.", 403)
        }
    }
    verifyDates(vaccinationDate: Date, born_date: Date){
        const now = new Date();
        const vaccination = new Date(vaccinationDate);
        const born = new Date(born_date);
        if(vaccination < subHours(now,3)){
            throw new AppError("The Vaccination date cannot be in the past.")
        }

        if(born > subHours(now,3)){
            throw new AppError("Do you came from future?")
        }

        if(!availableHours.includes(vaccination.getUTCHours())){
            throw new AppError("Outside vaccination hours.")
        }
    }
}

export { VaccineScheduleService };

