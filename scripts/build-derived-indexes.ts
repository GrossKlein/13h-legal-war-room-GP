import fs from "node:fs";
import path from "node:path";

type Claim = {
  id: string;
  proceeding_ids: string[];
  supporting_evidence_ids: string[];
  contradicting_evidence_ids: string[];
};

type Evidence = {
  id: string;
};

type Event = {
  id: string;
  date: string;
  proceeding_id: string | null;
};

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const indexDir = path.join(dataDir, "indexes");

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf-8");
}

function compareEventOrder(a: Event, b: Event): number {
  if (a.date === "undated" && b.date !== "undated") return 1;
  if (a.date !== "undated" && b.date === "undated") return -1;
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
  return a.id.localeCompare(b.id);
}

function main(): void {
  const claims = readJson<Claim[]>(path.join(dataDir, "claims.json"));
  const evidence = [
    ...readJson<Evidence[]>(path.join(dataDir, "evidence.part1.json")),
    ...readJson<Evidence[]>(path.join(dataDir, "evidence.part2.json")),
    ...readJson<Evidence[]>(path.join(dataDir, "evidence.part3.json")),
    ...readJson<Evidence[]>(path.join(dataDir, "evidence.part4.json")),
  ];
  const events = [
    ...readJson<Event[]>(path.join(dataDir, "events.part1.json")),
    ...readJson<Event[]>(path.join(dataDir, "events.part2.json")),
    ...readJson<Event[]>(path.join(dataDir, "events.part3.json")),
    ...readJson<Event[]>(path.join(dataDir, "events.part4.json")),
  ];

  fs.mkdirSync(indexDir, { recursive: true });

  const claimsByProceeding: Record<string, string[]> = {};
  for (const claim of claims) {
    for (const proceedingId of claim.proceeding_ids) {
      if (!claimsByProceeding[proceedingId]) {
        claimsByProceeding[proceedingId] = [];
      }
      if (!claimsByProceeding[proceedingId].includes(claim.id)) {
        claimsByProceeding[proceedingId].push(claim.id);
      }
    }
  }

  const evidenceByClaim: Record<string, { supporting: string[]; contradicting: string[] }> = {};
  for (const claim of claims) {
    evidenceByClaim[claim.id] = {
      supporting: [...claim.supporting_evidence_ids],
      contradicting: [...claim.contradicting_evidence_ids],
    };
  }

  const eventsByProceeding: Record<string, string[]> = {};
  for (const event of events) {
    if (!event.proceeding_id) continue;
    if (!eventsByProceeding[event.proceeding_id]) {
      eventsByProceeding[event.proceeding_id] = [];
    }
    if (!eventsByProceeding[event.proceeding_id].includes(event.id)) {
      eventsByProceeding[event.proceeding_id].push(event.id);
    }
  }

  const timelineOrder = [...events].sort(compareEventOrder).map((event) => event.id);

  writeJson(path.join(indexDir, "claims-by-proceeding.json"), claimsByProceeding);
  writeJson(path.join(indexDir, "evidence-by-claim.json"), evidenceByClaim);
  writeJson(path.join(indexDir, "events-by-proceeding.json"), eventsByProceeding);
  writeJson(path.join(indexDir, "timeline-order.json"), timelineOrder);

  void evidence;
  console.log("Derived indexes built.");
}

main();
