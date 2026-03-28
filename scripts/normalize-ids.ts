import fs from "node:fs";
import path from "node:path";

export function isValidClaimId(id: string): boolean {
  return /^claim-\d{4}$/.test(id);
}

export function isValidEvidenceId(id: string): boolean {
  return /^evidence-\d{4}$/.test(id);
}

export function isValidEventId(id: string): boolean {
  return /^event-\d{4}$/.test(id);
}

export function isValidEntityId(id: string): boolean {
  return /^entity-\d{4}$/.test(id);
}

export function isValidProceedingId(id: string): boolean {
  return /^proc-\d{4}$/.test(id);
}

export function makeSequentialId(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

type Item = { id: string };

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function verifyCollection(
  label: string,
  items: Item[],
  validator: (id: string) => boolean,
): string[] {
  return items.filter((item) => !validator(item.id)).map((item) => `${label}: ${item.id}`);
}

function main(): void {
  const root = process.cwd();
  const dataDir = path.join(root, "src", "data");

  const claims = readJson<Item[]>(path.join(dataDir, "claims.json"));
  const evidence = [
    ...readJson<Item[]>(path.join(dataDir, "evidence.part1.json")),
    ...readJson<Item[]>(path.join(dataDir, "evidence.part2.json")),
    ...readJson<Item[]>(path.join(dataDir, "evidence.part3.json")),
    ...readJson<Item[]>(path.join(dataDir, "evidence.part4.json")),
  ];
  const events = [
    ...readJson<Item[]>(path.join(dataDir, "events.part1.json")),
    ...readJson<Item[]>(path.join(dataDir, "events.part2.json")),
    ...readJson<Item[]>(path.join(dataDir, "events.part3.json")),
    ...readJson<Item[]>(path.join(dataDir, "events.part4.json")),
  ];
  const entities = readJson<Item[]>(path.join(dataDir, "entities.json"));
  const proceedings = readJson<Item[]>(path.join(dataDir, "proceedings.json"));

  const invalidIds = [
    ...verifyCollection("claims", claims, isValidClaimId),
    ...verifyCollection("evidence", evidence, isValidEvidenceId),
    ...verifyCollection("events", events, isValidEventId),
    ...verifyCollection("entities", entities, isValidEntityId),
    ...verifyCollection("proceedings", proceedings, isValidProceedingId),
  ];

  if (invalidIds.length === 0) {
    console.log("All canonical IDs are already normalized.");
    return;
  }

  console.log("Invalid IDs detected:");
  for (const invalidId of invalidIds) {
    console.log(`- ${invalidId}`);
  }
}

main();
