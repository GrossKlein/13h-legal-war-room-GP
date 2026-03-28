import {
  claimById,
  evidenceById,
  entityById,
  eventById,
  getClaims,
  getEvidence,
  getEntities,
  getEvents,
  getProceedings,
  proceedingById,
} from "./data";

import type { Claim } from "../types/claim";
import type { Evidence } from "../types/evidence";
import type { Entity } from "../types/entity";
import type { Event } from "../types/event";
import type { Proceeding } from "../types/proceeding";

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }
  return result;
}

export function getSupportingEvidenceForClaim(claimId: string): Evidence[] {
  const claim = claimById[claimId];
  if (!claim) return [];
  return uniqueById(
    claim.supporting_evidence_ids
      .map((id) => evidenceById[id])
      .filter((item): item is Evidence => Boolean(item)),
  );
}

export function getContradictingEvidenceForClaim(claimId: string): Evidence[] {
  const claim = claimById[claimId];
  if (!claim) return [];
  return uniqueById(
    claim.contradicting_evidence_ids
      .map((id) => evidenceById[id])
      .filter((item): item is Evidence => Boolean(item)),
  );
}

export function getEventsForClaim(claimId: string): Event[] {
  const claim = claimById[claimId];
  if (!claim) return [];
  return uniqueById(
    claim.related_event_ids
      .map((id) => eventById[id])
      .filter((item): item is Event => Boolean(item)),
  );
}

export function getClaimsForEvidence(evidenceId: string): Claim[] {
  const evidence = evidenceById[evidenceId];
  if (!evidence) return [];
  return uniqueById(
    evidence.related_claim_ids
      .map((id) => claimById[id])
      .filter((item): item is Claim => Boolean(item)),
  );
}

export function getEventsForEvidence(evidenceId: string): Event[] {
  const evidence = evidenceById[evidenceId];
  if (!evidence) return [];
  return uniqueById(
    evidence.related_event_ids
      .map((id) => eventById[id])
      .filter((item): item is Event => Boolean(item)),
  );
}

export function getClaimsForEvent(eventId: string): Claim[] {
  const event = eventById[eventId];
  if (!event) return [];
  return uniqueById(
    event.related_claim_ids
      .map((id) => claimById[id])
      .filter((item): item is Claim => Boolean(item)),
  );
}

export function getEvidenceForEvent(eventId: string): Evidence[] {
  const event = eventById[eventId];
  if (!event) return [];
  return uniqueById(
    event.related_evidence_ids
      .map((id) => evidenceById[id])
      .filter((item): item is Evidence => Boolean(item)),
  );
}

export function getProceedingForEvent(eventId: string): Proceeding | undefined {
  const event = eventById[eventId];
  if (!event || !event.proceeding_id) return undefined;
  return proceedingById[event.proceeding_id];
}

export function getProceedingsForClaim(claimId: string): Proceeding[] {
  const claim = claimById[claimId];
  if (!claim) return [];
  return uniqueById(
    claim.proceeding_ids
      .map((id) => proceedingById[id])
      .filter((item): item is Proceeding => Boolean(item)),
  );
}

export function getProceedingsForEvidence(evidenceId: string): Proceeding[] {
  const evidence = evidenceById[evidenceId];
  if (!evidence) return [];
  return uniqueById(
    evidence.proceeding_ids
      .map((id) => proceedingById[id])
      .filter((item): item is Proceeding => Boolean(item)),
  );
}

export function getEntitiesForEvent(eventId: string): Entity[] {
  const event = eventById[eventId];
  if (!event) return [];
  return uniqueById(
    event.related_entity_ids
      .map((id) => entityById[id])
      .filter((item): item is Entity => Boolean(item)),
  );
}

export function getProceedingBundle(proceedingId: string): {
  proceeding: Proceeding | undefined;
  claims: Claim[];
  evidence: Evidence[];
  events: Event[];
} {
  const proceeding = proceedingById[proceedingId];
  if (!proceeding) {
    return {
      proceeding: undefined,
      claims: [],
      evidence: [],
      events: [],
    };
  }

  const claims = getClaims().filter((item) => item.proceeding_ids.includes(proceedingId));
  const evidence = getEvidence().filter((item) => item.proceeding_ids.includes(proceedingId));
  const events = getEvents().filter((item) => item.proceeding_id === proceedingId);

  return {
    proceeding,
    claims,
    evidence,
    events,
  };
}
