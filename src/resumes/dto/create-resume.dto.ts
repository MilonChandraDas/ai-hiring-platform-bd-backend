export class CreateResumeDto {
    name: string
    email: string
    phone:string
    about?:string
    education:string
    experience?:string
    expectedSalary?:string
    skill:string | string[]
}