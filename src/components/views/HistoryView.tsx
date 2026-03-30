import React, { useState } from "react";
import "./HistoryView.css";

const allTransactions = [
  { id: 1, name: "Mercado São Paulo", type: "debit", amount: -189.90, date: "28/03/2026", icon: "🛒", category: "Compras" },
  { id: 2, name: "Salário — Tech Corp", type: "credit", amount: 7850.00, date: "27/03/2026", icon: "💼", category: "Receita" },
  { id: 3, name: "Netflix", type: "debit", amount: -39.90, date: "25/03/2026", icon: "🎬", category: "Assinaturas" },
  { id: 4, name: "Pix — Carlos Mendes", type: "credit", amount: 250.00, date: "24/03/2026", icon: "⚡", category: "Pix" },
  { id: 5, name: "iFood", type: "debit", amount: -67.50, date: "23/03/2026", icon: "🍔", category: "Alimentação" },
  { id: 6, name: "Uber", type: "debit", amount: -24.80, date: "22/03/2026", icon: "🚗", category: "Transporte" },
  { id: 7, name: "Spotify", type: "debit", amount: -21.90, date: "20/03/2026", icon: "🎵", category: "Assinaturas" },
  { id: 8, name: "Farmácia Drogasil", type: "debit", amount: -48.60, date: "19/03/2026", icon: "💊", category: "Saúde" },
  { id: 9, name: "Pix — Maria Silva", type: "credit", amount: 180.00, date: "18/03/2026", icon: "⚡", category: "Pix" },
  { id: 10, name: "Conta de Luz", type: "debit", amount: -134.20, date: "15/03/2026", icon: "⚡", category: "Contas" },
  { id: 11, name: "Amazon", type: "debit", amount: -299.90, date: "14/03/2026", icon: "📦", category: "Compras" },
  { id: 12, name: "Rendimento Poupança", type: "credit", amount: 32.50, date: "01/03/2026", icon: "💰", category: "Investimentos" },
];

// FIX Bug 5: format currency value cleanly (no manual sign prefix before R$)
const formatBRL = (value: number): string =>
  Math.abs(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const HistoryView: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [search, setSearch] = useState("");

  const filtered = allTransactions.filter((tx) => {
    const matchType = filter === "all" || tx.type === filter;
    const matchSearch =
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const totalIn = allTransactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);
  const totalOut = allTransactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + Math.abs(t.amount), 0);

  return (
    <div className="history-view">
      <div className="view-header">
        <h1 className="view-title">Extrato</h1>
        <p className="view-sub">Março 2026</p>
      </div>

      {/* FIX Bug 5: removed manual +/- prefix before R$ symbol */}
      <div className="history-summary">
        <div className="summary-card">
          <span className="summary-icon credit-icon">↓</span>
          <div>
            <span className="summary-label">Entradas</span>
            <span className="summary-value credit">{formatBRL(totalIn)}</span>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="summary-card">
          <span className="summary-icon debit-icon">↑</span>
          <div>
            <span className="summary-label">Saídas</span>
            <span className="summary-value debit">{formatBRL(totalOut)}</span>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="summary-card">
          <span className="summary-icon balance-icon">◇</span>
          <div>
            <span className="summary-label">Saldo período</span>
            <span className="summary-value">{formatBRL(totalIn - totalOut)}</span>
          </div>
        </div>
      </div>

      <div className="history-controls">
        {/* FIX Bug 8: add aria-label to search input */}
        <div className="search-box">
          <span aria-hidden="true">🔍</span>
          <input
            aria-label="Buscar transação"
            placeholder="Buscar transação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs" role="group" aria-label="Filtrar por tipo">
          {(["all", "credit", "debit"] as const).map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Todos" : f === "credit" ? "Entradas" : "Saídas"}
            </button>
          ))}
        </div>
      </div>

      {/* FIX Bugs 2 & 3: renamed tx-* classes to hist-tx-* to avoid CSS conflicts with HomeView */}
      <div className="history-list">
        {filtered.length === 0 ? (
          <div className="empty-state">Nenhuma transação encontrada</div>
        ) : (
          filtered.map((tx) => (
            <div key={tx.id} className="history-item">
              <div className="hist-tx-icon-wrap">
                <span aria-hidden="true">{tx.icon}</span>
              </div>
              <div className="hist-tx-info">
                <span className="hist-tx-name">{tx.name}</span>
                <span className="hist-tx-meta">{tx.category} · {tx.date}</span>
              </div>
              <div className="hist-tx-right">
                {/* FIX Bug 4: show sign correctly — credit positive, debit negative */}
                <span className={`hist-tx-amount ${tx.type}`}>
                  {tx.type === "credit" ? "+" : "-"}{formatBRL(tx.amount)}
                </span>
                <span className={`hist-tx-badge ${tx.type}`}>
                  {tx.type === "credit" ? "Crédito" : "Débito"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
