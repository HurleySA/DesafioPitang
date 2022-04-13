
import { VaccineSchedule } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import Joi from "joi";
import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
//
let availableHours: number[] = [];
for(let i = +process.env.FIRST_HOUR_SERVICE!; i <= +process.env.LAST_HOUR_SERVICE!; i++){
    availableHours.push(i);
}

const schema = Joi.object({
    name: Joi.string().min(5).required(),
    born_date: Joi.date().iso().less('now').required(),
    vaccination_date: Joi.date().iso().min('now').required(),
    vaccinated: Joi.boolean().default(false),
    conclusion: Joi.string().allow(null),
})

interface ICreateVaccineSchedule {
    "name": string;
    "born_date": Date;
    "vaccination_date": Date;

}

class VaccineScheduleService {
    async listVaccineSchedule():Promise<VaccineSchedule[]> {
        const schedules = await prismaClient.vaccineSchedule.findMany({
            orderBy: {
                vaccination_date: 'asc'
            }
        })
        return schedules;
    }
    async createVaccineSchedule({ name, born_date, vaccination_date }: ICreateVaccineSchedule): Promise<VaccineSchedule>{
        const validation = schema.validate({ name, born_date, vaccination_date },{
            abortEarly:false
        })
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }
        const vaccinationDate = new Date(vaccination_date)
        vaccinationDate.setMinutes(0)
        vaccinationDate.setSeconds(0)

        if(!availableHours.includes(vaccinationDate.getUTCHours())){
            throw new AppError("Outside vaccination hours.")
        }

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
        const schedulesByHours = await prismaClient.vaccineSchedule.findMany({
            where: {
                vaccination_date: vaccinationDate
            }
        })
    
        if(schedulesByHours.length >= +process.env.MAX_SCHEDULES_BY_HOUR!){
            throw new AppError("Already have 2 reservations at this hour.", 403)
        }
        const schedules = await prismaClient.vaccineSchedule.findMany({
            where:{
                vaccination_date:{
                    gte: startOfDay(new Date(vaccinationDate)),
                    lt: endOfDay(new Date(vaccinationDate))
                }
            }
        });
        if(schedules.length >= +process.env.MAX_SCHEDULES_BY_DAY!){
            throw new AppError("Already have 20 reservations at this day.", 403)
        }
    }
}

export { VaccineScheduleService };

