import { z } from "zod";

export const emailSchema = z.object({
  emailAddress: z.string().email("Invalid email address").describe("Email address to send the email to"),
  emailSubject: z.string().describe("Subject of the email"),
  emailBody: z.string().describe("Body of the email"),
});

export type EmailData = z.infer<typeof emailSchema>;
