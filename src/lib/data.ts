import claimsData from "../data/claims.json";
import evidenceData from "../data/evidence.json";
import eventsData from "../data/events.json";
import entitiesData from "../data/entities.json";
import proceedingsData from "../data/proceedings.json";

import type { Claim } from "../types/claim";
import type { Evidence } from "../types/evidence";
import type { Event } from "../types/event";
import type { Entity } from "../types/entity";
import type { Proceeding } from "../types/proceeding";

const claims = claimsData as Claim[];
const evidence = evidenceData as Evidence[];
const events = eventsData as Event[];
const entities = entitiesData as Entity[];
const proceedings = proceedingsData as Proceeding[];

export const claimById: Record<string, Claim> = Object.fromEntries(
  claims.map((item) => [item.id, item]),
);

export const evidenceById: Record<string, Evidence> = Object.fromEntries(
  evidence.map((item) => [item.id, item]),
);

export const eventById: Record<string, Event> = Object.fromEntries(
  events.map((item) => [item.id, item]),
);

export const entityById: Record<string, Entity> = Object.fromEntries(
  entities.map((item) => [item.id, item]),
);

export const proceedingById: Record<string, Proceeding> = Object.fromEntries(
  proceedings.map((item) => [item.id, item]),
);

export function getClaims(): Claim[] {
  return [...claims];
}

export function getEvidence(): Evidence[] {
  return [...evidence];
}

export function getEvents(): Event[] {
  return [...events];
}

export function getEntities(): Entity[] {
  return [...entities];
}

export function getProceedings(): Proceeding[] {
  return [...proceedings];
}

export function getClaimById(id: string): Claim | undefined {
  return claimById[id];
}

export function getEvidenceById(id: string): Evidence | undefined {
  return evidenceById[id];
}

export function getEventById(id: string): Event | undefined {
  return eventById[id];
}

export function getEntityById(id: string): Entity | undefined {
  return entityById[id];
}

export function getProceedingById(id: string): Proceeding | undefined {
  return proceedingById[id];
}
