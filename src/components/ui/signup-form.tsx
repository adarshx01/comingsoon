"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const SignupForm = ({
  onSubmit,
  title,
  description,
  submitting,
  submitted,
  buttonText,
  inputPlaceholder,
  inputType = "input",
}: {
  onSubmit: (data: any) => Promise<{ success: boolean; message: string }>;
  title: string;
  description: string;
  submitting: string;
  submitted: string;
  buttonText: string;
  inputPlaceholder: string;
  inputType?: "input" | "textarea";
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await onSubmit({ email, message });
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm mt-2 mb-4">
        {description}
      </p>
      {isSubmitted ? (
        <div className="text-green-500 text-center py-4">{submitted}</div>
      ) : (
        <form className="my-2" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="md:w-3/5"
            />
            {inputType === "input" ? (
              <Input
                placeholder={inputPlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="md:w-2/5"
              />
            ) : (
              <Textarea
                placeholder={inputPlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="md:w-2/5"
                rows={1}
              />
            )}
          </div>
          <Button
            className={cn(
              "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
              isLoading &&
                "cursor-not-allowed opacity-50 pointer-events-none"
            )}
            disabled={isLoading}
          >
            {isLoading ? submitting : buttonText}
            <BottomGradient />
          </Button>
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}
        </form>
      )}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
