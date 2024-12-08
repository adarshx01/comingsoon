'use server'

import { db } from '@/db';
import axios from 'axios';
import { z } from 'zod';


const SuggestionSchema = z.object({
  text: z.string().trim().min(10, { message: "Suggestion must be at least 10 characters long" })
});


interface ServiceResult {
  success: boolean;
  message?: string;
  count?: number;
  suggestions?: any[];
}


async function fetchIpAddresses(): Promise<{ ipv4: string | null; ipv6: string | null }> {
  try {

    const [ipv4Response, ipv6Response] = await Promise.all([
      axios.get('https://api.ipify.org?format=json').catch(() => ({ data: { ip: null } })),
      axios.get('https://api6.ipify.org?format=json').catch(() => ({ data: { ip: null } }))
    ]);

    return {
      ipv4: ipv4Response.data.ip,
      ipv6: ipv6Response.data.ip
    };
  } catch (error) {
    console.error('IP retrieval error:', error);
    return { ipv4: null, ipv6: null };
  }
}


export async function vote(): Promise<ServiceResult> {
  try {
  
    const { ipv4, ipv6 } = await fetchIpAddresses();

 
    if (!ipv4 && !ipv6) {
      return {
        success: false,
        message: "Unable to determine your IP address. Please try again."
      };
    }

    const existingVote = await db.vote.findFirst({
      where: {
        OR: [
          { ipv4: ipv4 || undefined },
          { ipv6: ipv6 || undefined }
        ]
      }
    });

    if (existingVote) {
      const voteCount = await db.vote.count();
      return {
        success: false,
        count: voteCount,
        message: "You've already voted."
      };
    }


    const newVote = await db.vote.create({
      data: {
        ipv4: ipv4 || undefined,
        ipv6: ipv6 || undefined
      }
    });


    const voteCount = await db.vote.count();

    return {
      success: true,
      count: voteCount,
      message: "Thank you for voting!"
    };
  } catch (error) {
    console.error("Error during voting:", error);
    return {
      success: false,
      message: `Failed to process your vote: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    };
  }
}


export async function submitSuggestion(suggestionText: string): Promise<ServiceResult> {
  try {
   
    const validationResult = SuggestionSchema.safeParse({ text: suggestionText });
    
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0]?.message || "Invalid suggestion"
      };
    }

    const { ipv4, ipv6 } = await fetchIpAddresses();

 
    if (!ipv4 && !ipv6) {
      return {
        success: false,
        message: "Unable to determine your IP address. Please try again."
      };
    }

    const existingVote = await db.vote.findFirst({
      where: {
        OR: [
          { ipv4: ipv4 || undefined },
          { ipv6: ipv6 || undefined }
        ]
      },
      
    });

    // if (!existingVote) {
    //   return {
    //     success: false,
    //     message: "You must vote before submitting a suggestion."
    //   };
    // }

    const existingSuggestion = await db.suggestion.findFirst({
      where: {
        OR: [
          { ipv4: ipv4 || undefined },
          { ipv6: ipv6 || undefined }
        ]
      }
    });

    if (existingSuggestion) {
      return {
        success: false,
        message: "You've already submitted a suggestion."
      };
    }

  
    await db.suggestion.create({
      data: {
        text: suggestionText,
        ipv4: ipv4 || undefined,
        ipv6: ipv6 || undefined,
        voteIpv4: ipv4 || undefined,
        voteIpv6: ipv6 || undefined
      }
    });

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
    console.error("Error submitting suggestion:", error);
    return {
      success: false,
      message: `Failed to submit suggestion: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
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
    console.error("Error fetching suggestions:", error);
    return {
      success: false,
      message: `Failed to fetch suggestions: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
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
    console.error("Error getting vote count:", error);
    return {
      success: false,
      count: 0,
      message: `Failed to fetch vote count: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    };
  }
}