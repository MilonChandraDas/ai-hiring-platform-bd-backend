import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
const pdfParse = require('pdf-parse');

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }

  // ✅ existing method - unchanged
  async analyzeResume(resumeData: any) {
    let resumeText = '';
    if (resumeData.resumeUrl) {
      try {
        const response = await fetch(resumeData.resumeUrl);
        const buffer = await response.arrayBuffer();
        const pdfData = await pdfParse(Buffer.from(buffer));
        resumeText = pdfData.text;
      } catch (error) {
        console.log('PDF parse failed:', error);
      }
    }

    const prompt = `
      Analyze this resume and provide ATS score and feedback.
      Resume Form Data:
      Name: ${resumeData.name}
      Skills: ${resumeData.skill.join(', ')}
      Education: ${resumeData.education}
      Experience: ${resumeData.experience || 'Not provided'}
      ${resumeText ? `Resume PDF Content:\n${resumeText}` : ''}
      Respond ONLY in this exact JSON format, no other text:
      {"atsScore": 75, "review": "Your detailed review here"}
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const jsonMatch = text!.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    const cleaned = jsonMatch[0]
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/\n/g, ' ')
      .trim();
    return JSON.parse(cleaned);
  }

  // ✅ নতুন method - MCQ generate করবে
  async generateMCQ(jobTitle: string, jobDescription: string) {
    const prompt = `
      You are a technical interviewer. Generate exactly 10 MCQ questions for a "${jobTitle}" position.
      Job Description: ${jobDescription}

      Respond ONLY in this exact JSON format, no other text:
      {
        "questions": [
          {
            "id": 1,
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0
          }
        ]
      }

      Rules:
      - correctAnswer is the index (0,1,2,3) of the correct option
      - Questions must be relevant to ${jobTitle}
      - Mix of easy, medium, hard questions
      - Exactly 10 questions
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const jsonMatch = text!.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in MCQ response');
    const cleaned = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, ' ').trim();
    return JSON.parse(cleaned);
  }

  // ✅ নতুন method - Coding problems generate করবে
  async generateCodingProblems(jobTitle: string, jobDescription: string) {
    const prompt = `
      You are a technical interviewer. Generate exactly 3 coding problems for a "${jobTitle}" position.
      Job Description: ${jobDescription}

      Respond ONLY in this exact JSON format, no other text:
      {
        "problems": [
          {
            "id": 1,
            "title": "Problem title",
            "description": "Full problem description",
            "examples": [
              {"input": "example input", "output": "expected output"}
            ],
            "difficulty": "Easy"
          }
        ]
      }

      Rules:
      - Exactly 3 problems
      - Difficulty: one Easy, one Medium, one Hard
      - Problems must be relevant to ${jobTitle}
      - Clear input/output examples
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const jsonMatch = text!.match(/\{[\s\S]*\}/);
    if (!jsonMatch)
      throw new Error('No JSON found in coding problems response');
    const cleaned = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, ' ').trim();
    return JSON.parse(cleaned);
  }

  // ✅ নতুন method - MCQ check করবে
  async evaluateMCQ(questions: any[], candidateAnswers: number[]) {
    let correctCount = 0;
    const results = questions.map((q, index) => {
      const isCorrect = q.correctAnswer === candidateAnswers[index];
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        question: q.question,
        selectedAnswer: q.options[candidateAnswers[index]],
        correctAnswer: q.options[q.correctAnswer],
        isCorrect,
      };
    });

    return {
      score: correctCount,
      total: questions.length,
      results,
    };
  }

  // ✅ নতুন method - Code evaluate করবে AI দিয়ে
  async evaluateCode(
    problems: any[],
    codeSubmissions: { problemId: number; code: string; language: string }[],
  ) {
    const prompt = `
      You are a code reviewer. Evaluate these code submissions for the given problems.

      ${problems
        .map(
          (p, i) => `
        Problem ${i + 1}: ${p.title}
        Description: ${p.description}
        Candidate's Code (${codeSubmissions[i]?.language || 'javascript'}):
        ${codeSubmissions[i]?.code || 'No code submitted'}
      `,
        )
        .join('\n---\n')}

      Respond ONLY in this exact JSON format, no other text:
      {
        "results": [
          {
            "problemId": 1,
            "isCorrect": true,
            "score": 10,
            "maxScore": 10,
            "feedback": "Feedback for this problem"
          }
        ],
        "totalScore": 25,
        "maxScore": 30,
        "overallFeedback": "Overall performance feedback"
      }

      Rules:
      - Each problem max score: 10
      - Total max score: 30
      - Be fair but strict in evaluation
      - Give constructive feedback
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const jsonMatch = text!.match(/\{[\s\S]*\}/);
    if (!jsonMatch)
      throw new Error('No JSON found in code evaluation response');
    const cleaned = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, ' ').trim();
    return JSON.parse(cleaned);
  }
}
