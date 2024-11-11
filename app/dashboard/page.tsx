"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import EmailPreview from "@/components/EmailPreview";
import { useToast } from "@/hooks/use-toast";
import { Send, Eye, Wand2 } from "lucide-react";

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [editInstructions, setEditInstructions] = useState("");
  const { toast } = useToast();

  const generateEmail = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    // In production, this would call an AI service to generate the email
    const generatedEmail = `Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting. Based on the requirements outlined, I believe my skills and experience make me an excellent candidate.

${jobDescription}

I look forward to discussing how I can contribute to your team.

Best regards,
[Your name]`;

    setEmailContent(generatedEmail);
    setIsReviewing(true);
  };

  const handleAIEdit = () => {
    if (!editInstructions.trim()) {
      toast({
        title: "Error",
        description: "Please provide instructions for the AI",
        variant: "destructive",
      });
      return;
    }

    // In production, this would send both the original email and instructions to the AI service
    toast({
      title: "Processing",
      description: "AI is updating the email based on your instructions...",
    });

    // Simulate AI processing
    setTimeout(() => {
      const updatedEmail = `Dear Hiring Manager,

I am writing to express my enthusiasm for the position. Your job posting particularly caught my attention, and I believe I would be an exceptional addition to your team.

${jobDescription}

${editInstructions} // This line simulates AI incorporating the edit instructions

I am excited about the possibility of contributing to your organization and would welcome the opportunity to discuss how my background aligns with your needs.

Best regards,
[Your name]`;

      setEmailContent(updatedEmail);
      setEditInstructions("");
      
      toast({
        title: "Success",
        description: "Email has been updated by AI",
      });
    }, 1500);
  };

  const handleSendEmail = () => {
    toast({
      title: "Success",
      description: "Email has been sent successfully!",
    });
    setJobDescription("");
    setEmailContent("");
    setIsReviewing(false);
    setEditInstructions("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Job Description Email System
        </h1>

        <div className="grid gap-6">
          {!isReviewing ? (
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Enter Job Description</h2>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="mb-4 min-h-[200px]"
              />
              <Button onClick={generateEmail}>
                <Eye className="mr-2 h-4 w-4" />
                Generate & Preview Email
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <EmailPreview
                content={emailContent}
                onEdit={() => setIsReviewing(false)}
                onSend={handleSendEmail}
                onContentChange={setEmailContent}
              />
              
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">AI Assistant</h2>
                <Textarea
                  value={editInstructions}
                  onChange={(e) => setEditInstructions(e.target.value)}
                  placeholder="Enter instructions for AI to modify the email (e.g., 'Make it more formal' or 'Emphasize leadership skills')"
                  className="mb-4"
                />
                <Button onClick={handleAIEdit}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Apply AI Changes
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}