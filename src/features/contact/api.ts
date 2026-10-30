import { apiClient } from "@/lib/apiClient";
import type { ContactPayload } from "@/types/api";

export interface ContactResponse {
  message: string;
}

/** `POST /portfolio/contact` — sends the contact form email via Resend. */
export const sendContact = async (payload: ContactPayload): Promise<ContactResponse> => {
  const { data } = await apiClient.post<ContactResponse>("/portfolio/contact", payload);
  return data;
};
