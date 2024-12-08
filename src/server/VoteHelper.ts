// server/VoteHelper.ts
'use server'

import { z } from 'zod';
import { db } from '@/db';
import { ServiceResult, ClientIpPayload, SuggestionData } from '@/lib/types';

const SuggestionSchema = z.object({
  text: z.string().trim().min(10, { message: "Suggestion must be at least 10 characters long" }),
  clientIp: z.object({
    ipv4: z.string().nullable(),
    ipv6: z.string().nullable()
  })
});

export async function handleVote(clientIp: ClientIpPayload): Promise<ServiceResult> {
  try {
    // Validate IP input
    if (!clientIp || (!clientIp.ipv4 && !clientIp.ipv6)) {
      return {
        success: false,
        message: "Unable to determine your IP address. Please try again."
      };
    }

    // Check for existing vote
    const existingVote = await db.vote.findFirst({
      where: {
        OR: [
          { ipv4: clientIp.ipv4 || undefined },
          { ipv6: clientIp.ipv6 || undefined }
        ]
      }
    });

    // If already voted
    if (existingVote) {
      const voteCount = await db.vote.count();
      return {
        success: false,
        count: voteCount,
        message: "You've already voted."
      };
    }

    // Create new vote
    await db.vote.create({
      data: {
        ipv4: clientIp.ipv4 || undefined,
        ipv6: clientIp.ipv6 || undefined
      }
    });

    // Get updated vote count
    const voteCount = await db.vote.count();

    return {
      success: true,
      count: voteCount,
      message: "Thank you for voting!"
    };
  } catch (error) {
    console.error("Vote Error:", error);
    return {
      success: false,
      message: `Vote failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function handleSuggestion(suggestionData: SuggestionData): Promise<ServiceResult> {
  try {
    // Validate input
    const validationResult = SuggestionSchema.safeParse(suggestionData);
    
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0]?.message || "Invalid suggestion"
      };
    }

    const { text, clientIp } = suggestionData;

    // Validate IP
    if (!clientIp || (!clientIp.ipv4 && !clientIp.ipv6)) {
      return {
        success: false,
        message: "Unable to determine your IP address. Please try again."
      };
    }

    // Check for existing suggestion
    const existingSuggestion = await db.suggestion.findFirst({
      where: {
        OR: [
          { ipv4: clientIp.ipv4 || undefined },
          { ipv6: clientIp.ipv6 || undefined }
        ]
      }
    });

    // If already submitted
    if (existingSuggestion) {
      return {
        success: false,
        message: "You've already submitted a suggestion."
      };
    }

    // Create suggestion
    await db.suggestion.create({
      data: {
        text: text,
        ipv4: clientIp.ipv4 || undefined,
        ipv6: clientIp.ipv6 || undefined,
        voteIpv4: clientIp.ipv4 || undefined,
        voteIpv6: clientIp.ipv6 || undefined
      }
    });

    // Fetch recent suggestions
    const suggestions = await db.suggestion.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, 
      select: {
        id: true,
        text: true,
        createdAt: true
      }
    });

    return {
      success: true,
      message: "Suggestion submitted successfully!",
      suggestions: suggestions
    };
  } catch (error) {
    console.error("Suggestion Error:", error);
    return {
      success: false,
      message: `Suggestion failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function getVoteCount(): Promise<ServiceResult> {
  try {
    const voteCount = await db.vote.count();
    return { 
      success: true, 
      count: voteCount 
    };
  } catch (error) {
    console.error("Vote Count Error:", error);
    return {
      success: false,
      count: 0,
      message: `Failed to fetch vote count: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function getSuggestions(): Promise<ServiceResult> {
  try {
    const suggestions = await db.suggestion.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, 
      select: {
        id: true,
        text: true,
        createdAt: true
      }
    });

    return {
      success: true,
      suggestions: suggestions
    };
  } catch (error) {
    console.error("Suggestions Fetch Error:", error);
    return {
      success: false,
      message: `Failed to fetch suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}