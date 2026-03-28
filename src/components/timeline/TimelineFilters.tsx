import { useMemo, useState } from "react";
import type { Event } from "../../types/event";

type Props = { events: Event[] };

export default function TimelineFilters({ events }: Props) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((item) => {
      const matchesQuery =
        !q ||
        item.description.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q);
      const matchesType = !type || item.event_type === type;
      return matchesQuery && matchesType;
    });
  }, [events, query, type]);

  return (
    <div>
      <div className="filter-bar">
        <input className="input search-box" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search timeline" />
        <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All event types</option>
          <option value="filing">filing</option>
          <option value="communication">communication</option>
          <option value="inspection">inspection</option>
          <option value="ruling">ruling</option>
          <option value="transaction">transaction</option>
          <option value="modification">modification</option>
          <option value="demand">demand</option>
          <option value="obstruction">obstruction</option>
        </select>
      </div>
      <div className="card">
        <div className="meta">{filtered.length} event(s)</div>
        <div className="stack">
          {filtered.map((item) => (
            <div key={item.id} className="card">
              <div className="inline-list">
                <span className="badge neutral">{item.event_type}</span>
                <span className="badge neutral">{item.date_certainty}</span>
              </div>
              <div className="detail-item-label">{item.date}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
