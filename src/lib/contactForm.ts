export type ContactFormPayload = {
  name: FormDataEntryValue | string | null;
  phone: FormDataEntryValue | string | null;
  email?: FormDataEntryValue | string | null;
  message?: FormDataEntryValue | string | null;
  website?: FormDataEntryValue | string | null;
  _elapsed?: number;
};

/** Submit a contact form and reject unless the API confirms it was accepted. */
export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error(result?.error || `Contact API returned ${response.status}`);
  }
}
