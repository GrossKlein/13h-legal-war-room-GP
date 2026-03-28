import type { Claim } from "../types/claim";
import type { Evidence } from "../types/evidence";
import type { Event } from "../types/event";

export function compactText(value: string, maxLength?: number): string {
  const collapsed = value.replace(/\s+/g, " ").trim();
  if (!maxLength || collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function formatEvidenceSource(evidence: Evidence): string {
  const source = compactText(evidence.source);
  if (evidence.date) {
    return `${source} | ${compactText(evidence.date)}`;
  }
  return source;
}

export function formatEvidenceReference(evidence: Evidence): string {
  return compactText(evidence.full_reference ?? evidence.provenance);
}

export function formatClaimCitation(claim: Claim): string {
  return `${claim.id} | ${compactText(claim.asserted_in, 120)}`;
}

export function formatEventCitation(event: Event): string {
  return `${event.id} | ${compactText(event.date)} | ${compactText(event.description, 120)}`;
}
