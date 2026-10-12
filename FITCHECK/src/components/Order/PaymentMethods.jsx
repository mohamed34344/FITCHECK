export const PAYMENT_METHODS = [
  { key: "cod", label: "Cash on Delivery", icon: "bi-cash-coin", hint: "Pay when your order arrives." },
  { key: "card", label: "Credit / Debit Card", icon: "bi-credit-card", hint: "Visa, Mastercard." },
  { key: "wallet", label: "Mobile Wallet", icon: "bi-phone", hint: "Vodafone Cash, InstaPay, etc." },
];

function PaymentMethods({ value, onChange, card, onCardChange, errors = {} }) {
  return (
    <div>
      {PAYMENT_METHODS.map((m) => (
        <label
          key={m.key}
          className={`d-flex align-items-center gap-3 border rounded-3 p-3 mb-2 ${value === m.key ? "border-success bg-success-subtle" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <input type="radio" className="form-check-input mt-0" name="payment"
            checked={value === m.key} onChange={() => onChange(m.key)} />
          <i className={`bi ${m.icon} fs-4`}></i>
          <div>
            <div className="fw-semibold">{m.label}</div>
            <small className="text-muted">{m.hint}</small>
          </div>
        </label>
      ))}

      {value === "card" && (
        <div className="row g-2 mt-1">
          <div className="col-12">
            <input className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`} placeholder="Card number"
              inputMode="numeric" maxLength={19} value={card.number}
              onChange={(e) => onCardChange({ ...card, number: e.target.value.replace(/[^\d ]/g, "") })} />
            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
          </div>
          <div className="col-6">
            <input className={`form-control ${errors.cardExpiry ? "is-invalid" : ""}`} placeholder="MM/YY" maxLength={5}
              value={card.expiry} onChange={(e) => onCardChange({ ...card, expiry: e.target.value })} />
            {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
          </div>
          <div className="col-6">
            <input className={`form-control ${errors.cardCvv ? "is-invalid" : ""}`} placeholder="CVV" maxLength={4}
              inputMode="numeric" value={card.cvv}
              onChange={(e) => onCardChange({ ...card, cvv: e.target.value.replace(/\D/g, "") })} />
            {errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}
          </div>
          <small className="text-muted">Demo only: card details are validated but never stored or sent anywhere.</small>
        </div>
      )}

      {value === "wallet" && (
        <div className="mt-1">
          <input className={`form-control ${errors.walletNumber ? "is-invalid" : ""}`} placeholder="Wallet phone number"
            inputMode="tel" value={card.wallet}
            onChange={(e) => onCardChange({ ...card, wallet: e.target.value.replace(/[^\d+]/g, "") })} />
          {errors.walletNumber && <div className="invalid-feedback">{errors.walletNumber}</div>}
        </div>
      )}
    </div>
  );
}
export default PaymentMethods;
