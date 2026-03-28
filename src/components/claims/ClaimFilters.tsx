import { useMemo, useState } from "react";
import type { Claim } from "../../types/claim";

type Props = {
  claims: Claim[];
};

export default function ClaimFilters({ claims }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return claims.filter((item) => {
      const matchesQuery =
        !q ||
        item.statement.toLowerCase().includes(q) ||
        item.asserted_by.toLowerCase().includes(q) ||
        item.asserted_in.toLowerCase().includes(q) ||
        item.legal_significance.toLowerCase().includes(q);
      const matchesStatus = !status || item.claim_status === status;
      const matchesType = !type || item.claim_type === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [claims, query, status, type]);

  return (
    <div>
      <div className="filter-bar">
        <input className="input search-box" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search claims" />
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="alleged">alleged</option>
          <option value="supported">supported</option>
          <option value="contradicted">contradicted</option>
          <option value="judicially_addressed">judicially_addressed</option>
        </select>
        <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="factual_assertion">factual_assertion</option>
          <option value="legal_position">legal_position</option>
          <option value="sworn_statement">sworn_statement</option>
          <option value="allegation">allegation</option>
          <option value="expert_opinion">expert_opinion</option>
        </select>
      </div>
      <div className="card">
        <div className="meta">{filtered.length} claim(s)</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Statement</th>
                <th>Status</th>
                <th>Type</th>
                <th>Asserted By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><a href={`/claims/${item.id}/`}>{item.id}</a></td>
                  <td>{item.statement}</td>
                  <td>{item.claim_status}</td>
                  <td>{item.claim_type}</td>
                  <td>{item.asserted_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
