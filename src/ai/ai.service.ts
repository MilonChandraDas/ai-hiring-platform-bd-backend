import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
const pdfParse = require('pdf-parse')

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }

  async analyzeResume(resumeData: any) {
    let resumeText = ''

    // PDF থেকে text extract করো
    if (resumeData.resumeUrl) {
      try {
        const response = await fetch(resumeData.resumeUrl)
        const buffer = await response.arrayBuffer()
        const pdfData = await pdfParse(Buffer.from(buffer))
        resumeText = pdfData.text
      } catch (error) {
        console.log('PDF parse failed:', error.message)
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
}