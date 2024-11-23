import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, PenLine } from "lucide-react";
import { useState } from "react";
// import { generateEmailContent } from '@/lib/groq';

interface EmailPreviewProps {
  content: string;
  onEdit: () => void;
  onSend: () => void;
  onContentChange: (content: string) => void;
}

export default function EmailPreview({ 
  content, 
  onEdit, 
  onSend,
  onContentChange 
}: EmailPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      // const generatedContent = await generateEmailContent(
      //   "Generate a professional email with the following context: " + content
      // );
      const response = await fetch('/api/generate-email-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      console.log(`Generated email content:\n\n${data.content}`);
      
      const generatedContent = data.content;
      const extractedEmail = data.email;

      onContentChange(generatedContent);
    } catch (error) {
      console.error("Error generating email:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Review Email</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={handleGenerateContent}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate with GROQ"}
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
          >
            <PenLine className="mr-2 h-4 w-4" />
            {isEditing ? "Preview" : "Edit Manually"}
          </Button>
          <Button onClick={onSend}>
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>
      <div className="rounded-lg border bg-white p-4">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[300px] font-mono"
          />
        ) : (
          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        )}
      </div>
    </Card>
  );
}