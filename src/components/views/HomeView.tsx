import React, { useState } from "react";
import "./HomeView.css";

interface HomeViewProps { user: { name: string; account: string }; }

const transactions = [
  { id: 1, name: "Mercado São Paulo",   type: "debit",  amount: -189.90, date: "Hoje, 14:32",  icon: "🛒", category: "Compras" },
  { id: 2, name: "Salário — Tech Corp", type: "credit", amount: 7850.00, date: "Ontem, 08:00", icon: "💼", category: "Receita" },
  { id: 3, name: "Netflix",             type: "debit",  amount: -39.90,  date: "25/03",        icon: "🎬", category: "Assinaturas" },
  { id: 4, name: "Pix — Carlos Mendes", type: "credit", amount: 250.00,  date: "24/03",        icon: "⚡", category: "Pix" },
  { id: 5, name: "iFood",               type: "debit",  amount: -67.50,  date: "23/03",        icon: "🍔", category: "Alimentação" },
  { id: 6, name: "Uber",                type: "debit",  amount: -24.80,  date: "22/03",        icon: "🚗", category: "Transporte" },
];

const formatBRL = (v: number) =>
  Math.abs(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const HomeView: React.FC<HomeViewProps> = ({ user }) => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const firstName = user.name.split(" ")[0];

  return (
    <div className="home-view">
      <div className="home-header">
        <div>
          <h1 className="greeting">Olá, {firstName} 👋</h1>
          <p className="greeting-sub">Aqui está seu resumo financeiro de hoje</p>
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-card-glow" />
        <div className="balance-card-grid" />

        <div className="balance-top">
          <div>
            <span className="balance-label">Saldo disponível</span>
            <div className="balance-amount">
              {balanceVisible
                ? <span className="amount">R$ 12.480<span className="cents">,35</span></span>
                : <span className="amount hidden-balance">••••••</span>
              }
              <button className="toggle-balance"
                onClick={() => setBalanceVisible(!balanceVisible)}
                aria-label={balanceVisible ? "Ocultar saldo" : "Mostrar saldo"}>
                {balanceVisible ? "👁" : "🙈"}
              </button>
            </div>
          </div>
          <div className="balance-badge">▲ +8.4% mês</div>
        </div>

        <div className="balance-stats">
          <div className="bstat">
            <span className="bstat-label">Entradas</span>
            <span className="bstat-value up">R$ 8.100,00</span>
          </div>
          <div className="bstat">
            <span className="bstat-label">Saídas</span>
            <span className="bstat-value down">R$ 2.841,65</span>
          </div>
          <div className="bstat">
            <span className="bstat-label">Ag / Conta</span>
            <span className="bstat-value">{user.account}</span>
          </div>
        </div>
      </div>

      {/* Mini cards */}
      <div className="home-mini-cards">
        <div className="mini-card">
          <div className="mc-top">
            <div className="mc-icon" aria-hidden="true">⚡</div>
            <span className="mc-badge">Pix</span>
          </div>
          <div>
            <div className="mc-title">Chave Pix</div>
            <div className="mc-value">ana@email.com</div>
          </div>
        </div>
        <div className="mini-card">
          <div className="mc-top">
            <div className="mc-icon" aria-hidden="true">💳</div>
            <span className="mc-badge">38%</span>
          </div>
          <div>
            <div className="mc-title">Limite disponível</div>
            <div className="mc-value">R$ 6.500,00</div>
          </div>
          <div className="mc-bar" role="progressbar" aria-valuenow={38} aria-valuemin={0} aria-valuemax={100} aria-label="38% do limite utilizado">
            <div className="mc-bar-fill" style={{ width: "38%" }} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-header">
        <h2 className="section-title">Ações rápidas</h2>
      </div>
      <div className="quick-actions">
        {[
          { icon: "⚡", label: "Pix" },
          { icon: "↗",  label: "Transferir" },
          { icon: "📄", label: "Boleto" },
          { icon: "📱", label: "Recarga" },
          { icon: "◈",  label: "Investir" },
          { icon: "⬡",  label: "Mais" },
        ].map((a) => (
          <button key={a.label} className="quick-action-btn" aria-label={a.label}>
            <span className="qa-icon" aria-hidden="true">{a.icon}</span>
            <span className="qa-label">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="section-header">
        <h2 className="section-title">Últimas movimentações</h2>
        <button className="see-all-btn">Ver todas →</button>
      </div>

      <div className="transactions-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="tx-item">
            <div className="tx-icon-wrap" aria-hidden="true">
              <span className="tx-icon">{tx.icon}</span>
            </div>
            <div className="tx-info">
              <span className="tx-name">{tx.name}</span>
              <span className="tx-meta">{tx.category} · {tx.date}</span>
            </div>
            <span className={`tx-amount ${tx.type}`}>
              {tx.type === "credit" ? "+" : "−"}{formatBRL(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
