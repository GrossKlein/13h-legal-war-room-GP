import claimsData from "../data/claims.json";
import evidencePart1Data from "../data/evidence.part1.json";
import evidencePart2Data from "../data/evidence.part2.json";
import evidencePart3Data from "../data/evidence.part3.json";
import evidencePart4Data from "../data/evidence.part4.json";
import eventsPart1Data from "../data/events.part1.json";
import eventsPart2Data from "../data/events.part2.json";
import eventsPart3Data from "../data/events.part3.json";
import eventsPart4Data from "../data/events.part4.json";
import entitiesData from "../data/entities.json";
import proceedingsData from "../data/proceedings.json";

import type { Claim } from "../types/claim";
import type { Evidence } from "../types/evidence";
import type { Event } from "../types/event";
import type { Entity } from "../types/entity";
import type { Proceeding } from "../types/proceeding";

const claims = claimsData as Claim[];
const evidence = [
  ...(evidencePart1Data as Evidence[]),
  ...(evidencePart2Data as Evidence[]),
  ...(evidencePart3Data as Evidence[]),
  ...(evidencePart4Data as Evidence[]),
];
const events = [
  ...(eventsPart1Data as Event[]),
  ...(eventsPart2Data as Event[]),
  ...(eventsPart3Data as Event[]),
  ...(eventsPart4Data as Event[]),
];
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
