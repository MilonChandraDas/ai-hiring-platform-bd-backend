export class CreateJobDto {
    title: string
    description: string
    role: string
    salary?: string
    location?: string
    banner?: string
    jobType?: string
    experience?: string
    deadline?: string
    companyId: string
}