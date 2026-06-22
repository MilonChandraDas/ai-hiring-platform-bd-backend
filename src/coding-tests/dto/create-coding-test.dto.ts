export class CreateCodingTestDto {
    jobId: string
    title: string
    mcqQuestion?: string
    problemQuestion?: string
    language: string
    code?: string
    timeTaken?: number
    timeLimit?: number
    result?: string
}