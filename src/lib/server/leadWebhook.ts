import "server-only";

export type UnifiedLead = {
  source: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  form_data?: Record<string, unknown>;
};

const LEADS_WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const LEADS_WEBHOOK_SECRET = process.env.LEADS_WEBHOOK_SECRET;

export function isUnifiedLeadWebhookConfigured(): boolean {
  return Boolean(LEADS_WEBHOOK_URL && LEADS_WEBHOOK_SECRET);
}

/**
 * Sends a lead through the sales bot's single ingestion point. That endpoint
 * stores the lead, notifies @abadan_leads_bot and mirrors it to Nomad CRM.
 */
export async function sendUnifiedLead(lead: UnifiedLead): Promise<void> {
  if (!LEADS_WEBHOOK_URL || !LEADS_WEBHOOK_SECRET) {
    throw new Error("Unified lead webhook is not configured");
  }

  const response = await fetch(`${LEADS_WEBHOOK_URL}/api/webhook/lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": LEADS_WEBHOOK_SECRET,
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Unified lead webhook returned ${response.status}: ${detail.slice(0, 300)}`
    );
  }
}
