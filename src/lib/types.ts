export interface ClientIpPayload {
    ipv4: string | null;
    ipv6: string | null;
  }
  
  export interface ServiceResult {
    success: boolean;
    message?: string;
    count?: number;
    suggestions?: any[];
  }
  
  export interface SuggestionData {
    text: string;
    clientIp: ClientIpPayload;
  }