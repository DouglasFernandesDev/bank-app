import React, { useState } from "react";
import "./TransferView.css";

type TransferType = "pix" | "ted" | "doc";

const TransferView: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<TransferType>("pix");
  const [key, setKey] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  // FIX: properly parse currency input, guard against NaN
  const handleAmountChange = (value: string) => {
    const nums = value.replace(/\D/g, "");
    if (!nums) { setAmount(""); return; }
    const num = (parseInt(nums, 10) / 100).toFixed(2);
    setAmount(num);
  };

  // FIX: safe display — never shows NaN
  const displayAmount = (val: string): string => {
    const parsed = parseFloat(val);
    if (!val || isNaN(parsed)) return "0,00";
    return parsed.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      setKey("");
      setAmount("");
      setDescription("");
    }, 3000);
  };

  // FIX: typed step navigation to satisfy TS union type
  const goToStep = (s: 1 | 2 | 3) => setStep(s);

  if (success) {
    return (
      <div className="transfer-view">
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <h2>Transferência realizada!</h2>
          <p>R$ {displayAmount(amount)} enviado com sucesso</p>
          <div className="success-sub">Comprovante disponível no extrato</div>
        </div>
      </div>
    );
  }

  return (
    <div className="transfer-view">
      <div className="view-header">
        <h1 className="view-title">Transferência</h1>
        <p className="view-sub">Envie dinheiro com segurança</p>
      </div>

      <div className="transfer-steps">
        {([1, 2, 3] as const).map((s) => (
          <div key={s} className={`step-dot ${step >= s ? "done" : ""} ${step === s ? "active" : ""}`}>
            <span>{s}</span>
            <div className="step-label">
              {s === 1 ? "Tipo" : s === 2 ? "Dados" : "Confirmar"}
            </div>
          </div>
        ))}
        <div className="steps-line" />
      </div>

      <div className="transfer-card">
        {step === 1 && (
          <div className="step-content">
            <h3>Escolha o tipo de transferência</h3>
            <div className="type-options">
              {(["pix", "ted", "doc"] as TransferType[]).map((t) => (
                <button
                  key={t}
                  className={`type-option ${type === t ? "selected" : ""}`}
                  onClick={() => setType(t)}
                >
                  <span className="type-icon">
                    {t === "pix" ? "⚡" : t === "ted" ? "↗" : "📄"}
                  </span>
                  <div className="type-info">
                    <span className="type-name">{t.toUpperCase()}</span>
                    <span className="type-desc">
                      {t === "pix" ? "Instantâneo, 24h/7" : t === "ted" ? "Até 1 dia útil" : "Até 2 dias úteis"}
                    </span>
                  </div>
                  {type === t && <span className="type-check">✓</span>}
                </button>
              ))}
            </div>
            <button className="btn-next" onClick={() => goToStep(2)}>
              Continuar →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3>Dados da transferência</h3>
            <div className="form-fields">
              <div className="field-group">
                <label>{type === "pix" ? "Chave Pix" : "Agência / Conta"}</label>
                <input
                  type="text"
                  placeholder={type === "pix" ? "CPF, e-mail, telefone ou chave aleatória" : "Informe a agência e conta"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label>Valor</label>
                <div className="amount-input">
                  <span className="currency-prefix">R$</span>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={amount ? displayAmount(amount) : ""}
                    onChange={(e) => handleAmountChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="field-group">
                <label>Descrição (opcional)</label>
                <input
                  type="text"
                  placeholder="Para quê é essa transferência?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-row">
              <button className="btn-back" onClick={() => goToStep(1)}>← Voltar</button>
              <button className="btn-next" onClick={() => goToStep(3)} disabled={!key || !amount}>
                Revisar →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3>Confirme os dados</h3>
            <div className="review-box">
              <div className="review-row">
                <span>Tipo</span>
                <span className="review-value">{type.toUpperCase()}</span>
              </div>
              <div className="review-row">
                <span>{type === "pix" ? "Chave" : "Conta"}</span>
                <span className="review-value">{key}</span>
              </div>
              <div className="review-row">
                <span>Valor</span>
                <span className="review-value highlight">R$ {displayAmount(amount)}</span>
              </div>
              {description && (
                <div className="review-row">
                  <span>Descrição</span>
                  <span className="review-value">{description}</span>
                </div>
              )}
            </div>
            <div className="btn-row">
              <button className="btn-back" onClick={() => goToStep(2)}>← Voltar</button>
              <button className="btn-confirm" onClick={handleConfirm}>
                Confirmar envio ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferView;
