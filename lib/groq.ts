import { groq } from '@ai-sdk/groq';
import { config } from './config';
import { emailSchema } from './schema';
import { generateObject } from 'ai';

if (!config.groq.apiKey) {
  throw new Error('GROQ_API_KEY is not defined in environment variables');
}

const model = groq(config.aiModel);

function createPrompt(jobDescription:string) {
  let prompt = ``;
  return prompt;
}

export async function generateEmailContent(jobDescription: string) {
  // const prompt = createPrompt(jobDescription);
  const prompt = jobDescription;
  
  const responseObject = await generateObject({
    model: model,
    system: config.systemPrompt,
    prompt: prompt,
    schema: emailSchema,
  });

  console.log('responseObject', responseObject);

  return responseObject;
}