export class CreateCodingTestDto {
  jobId: string;
  title: string;
  language?: string;
  timeLimit?: number;
}

export class SubmitMCQDto {
  testId: string;
  mcqAnswers: number[]; // candidate er selected answer indexes
}

export class SubmitCodeDto {
  testId: string;
  codeSubmissions: {
    problemId: number;
    code: string;
    language: string;
  }[];
  timeTaken?: number;
}
