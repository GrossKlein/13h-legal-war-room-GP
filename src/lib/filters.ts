import {
  getClaims,
  getEvidence,
  getEvents,
} from "./data";

import type { Claim } from "../types/claim";
import type { Evidence } from "../types/evidence";
import type { Event } from "../types/event";
import type { ClaimStatus, ClaimType, EvidenceType, EventType } from "../types/enums";

function includesQuery(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export function getClaimsByProceedingId(proceedingId: string): Claim[] {
  return getClaims().filter((item) => item.proceeding_ids.includes(proceedingId));
}

export function getEvidenceByProceedingId(proceedingId: string): Evidence[] {
  return getEvidence().filter((item) => item.proceeding_ids.includes(proceedingId));
}

export function getEventsByProceedingId(proceedingId: string): Event[] {
  return getEvents().filter((item) => item.proceeding_id === proceedingId);
}

export function getClaimsByStatus(status: ClaimStatus): Claim[] {
  return getClaims().filter((item) => item.claim_status === status);
}

export function getClaimsByType(type: ClaimType): Claim[] {
  return getClaims().filter((item) => item.claim_type === type);
}

export function getEvidenceByType(type: EvidenceType): Evidence[] {
  return getEvidence().filter((item) => item.type === type);
}

export function getEventsByType(type: EventType): Event[] {
  return getEvents().filter((item) => item.event_type === type);
}

export function searchClaimsByText(query: string): Claim[] {
  const q = query.trim().toLowerCase();
  if (!q) return getClaims();
  return getClaims().filter(
    (item) =>
      includesQuery(item.statement, q) ||
      includesQuery(item.asserted_by, q) ||
      includesQuery(item.asserted_in, q) ||
      includesQuery(item.legal_significance, q),
  );
}

export function searchEvidenceByText(query: string): Evidence[] {
  const q = query.trim().toLowerCase();
  if (!q) return getEvidence();
  return getEvidence().filter(
    (item) =>
      includesQuery(item.source, q) ||
      includesQuery(item.excerpt, q) ||
      includesQuery(item.provenance, q) ||
      includesQuery(item.full_reference ?? "", q),
  );
}

export function searchEventsByText(query: string): Event[] {
  const q = query.trim().toLowerCase();
  if (!q) return getEvents();
  return getEvents().filter(
    (item) =>
      includesQuery(item.description, q) ||
      includesQuery(item.date, q) ||
      includesQuery(item.event_type, q),
  );
}
