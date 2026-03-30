import React, { useState } from "react";
import "./Login.css";

interface LoginProps {
  onLogin: (name: string, account: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [cpf, setCpf]           = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const formatCpf = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!cpf || !password) { setError("Preencha todos os campos."); return; }
    const raw = cpf.replace(/\D/g, "");
    if (raw.length !== 11) { setError("CPF inválido. Digite os 11 dígitos."); return; }
    if (password.length < 6) { setError("A senha deve ter no mínimo 6 caracteres."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin("Ana Carolina", "0001 2345-6"); }, 1400);
  };

  return (
    <div className="login-root">
      {/* LEFT */}
      <div className="login-left">
        <div className="login-left-bg">
          <div className="login-orb login-orb-1" />
          <div className="login-orb login-orb-2" />
          <div className="login-orb login-orb-3" />
          <div className="login-grid" />
        </div>

        <div className="login-left-content">
          <div className="login-brand">
            <div className="login-brand-mark">◆</div>
            <span className="login-brand-name">NovaBanco</span>
          </div>

          <p className="login-tagline">Banco Digital Premium</p>
          <h1 className="login-headline">
            Finanças que<br /><em>trabalham por você</em>
          </h1>
          <p className="login-subtext">
            Gerencie, invista e transfira com total segurança. Tecnologia bancária de ponta, direto no seu bolso.
          </p>

          <div className="login-stats">
            <div className="stat-item">
              <span className="stat-val">2M+</span>
              <span className="stat-lbl">Clientes</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">R$8B</span>
              <span className="stat-lbl">Movimentados</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">4.9★</span>
              <span className="stat-lbl">Avaliação</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-form-card">
          <div className="login-form-header">
            <p className="login-form-eyebrow">Acesso Seguro</p>
            <h2 className="login-form-title">Bem-vindo de volta</h2>
            <p className="login-form-sub">Entre com suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="cpf-input">CPF</label>
              <div className="field-input-wrap">
                <span className="field-input-icon">👤</span>
                <input id="cpf-input" type="text" inputMode="numeric"
                  className="field-input" placeholder="000.000.000-00"
                  value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))}
                  autoComplete="username" />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="pwd-input">Senha</label>
              <div className="field-input-wrap">
                <span className="field-input-icon">🔒</span>
                <input id="pwd-input" type="password"
                  className="field-input" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" />
              </div>
            </div>

            {error && <div className="login-error" role="alert">{error}</div>}

            <button type="button" className="forgot-link" onClick={(e) => e.preventDefault()}>
              Esqueceu a senha?
            </button>

            <button type="submit" className={`btn-login ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? <span className="spinner" /> : "Entrar na conta"}
            </button>
          </form>

          <div className="login-footer">
            <span>Não tem conta?</span>
            <button type="button" className="open-account-link" onClick={(e) => e.preventDefault()}>
              Abra a sua grátis →
            </button>
          </div>

          <div className="security-badge">
            <span>🔐</span>
            <span>Conexão criptografada SSL 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
