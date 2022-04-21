interface ICreateVaccineSchedule {
    "name": string;
    "born_date": Date;
    "vaccination_date": Date;

}

interface IUpdateVaccineSchedule {
    "name"?: string;
    "born_date"?: Date;
    "vaccination_date"?: Date;
    "vaccinated"?: boolean,
	"conclusion"?: string,
}

export { ICreateVaccineSchedule, IUpdateVaccineSchedule };

