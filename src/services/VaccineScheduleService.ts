
import { VaccineSchedule } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";

let availableHours: number[] = [];
for(let i = +process.env.FIRST_HOUR_SERVICE!; i <= +process.env.LAST_HOUR_SERVICE!; i++){
    availableHours.push(i);
}

interface ICreateVaccineSchedule {
    "name": string;
    "born_date": Date;
    "vaccination_date": Date;

}

class VaccineScheduleService {
    async createVaccineSchedule({ name, born_date, vaccination_date }: ICreateVaccineSchedule): Promise<VaccineSchedule>{
        const vaccinationDate = new Date(vaccination_date)
        const adjustedVaccinationDate = new Date(vaccinationDate.getFullYear(), vaccinationDate.getMonth(), vaccinationDate.getDay(), vaccinationDate.getUTCHours(), 0, 0);

        if( vaccinationDate < new Date()){
            throw new AppError("It's not possible create a reservation in the past.")
        }

        if(!availableHours.includes(vaccinationDate.getUTCHours())){
            throw new AppError("Outside vaccination hours.")
        }

        const schedulesByHours = await prismaClient.vaccineSchedule.findMany({
            where: {
                vaccination_date: adjustedVaccinationDate
            }
        })
        if(schedulesByHours.length >= +process.env.MAX_SCHEDULES_BY_HOUR!){
            throw new AppError("Already have 2 reservations at this hour.", 403)
        }
        const schedules = await prismaClient.vaccineSchedule.findMany();

        if(schedules.length >= +process.env.MAX_SCHEDULES_BY_DAY!){
            throw new AppError("Already have 20 reservations at this day.", 403)
        }
        const vaccineSchedule = await prismaClient.vaccineSchedule.create({
            data:{
                name,
                born_date,
                vaccination_date: adjustedVaccinationDate,
            }
        })    
        return vaccineSchedule;
    }
}

export { VaccineScheduleService };

