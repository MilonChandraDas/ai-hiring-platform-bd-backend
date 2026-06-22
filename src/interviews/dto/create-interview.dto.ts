export class CreateInterviewDto {
    applicationId: string
    candidateId: string
    scheduledAt: Date
    duration?: number
    meetingLink?:string
    notes?: string
}