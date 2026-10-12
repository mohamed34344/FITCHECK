import { useEffect, useState } from "react";
import { STATUS_STEPS, getOrderStatus } from "../../utils/orders";

function useTick(ms = 10000) {
  const [, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
}

export function StatusBadge({ order }) {
  useTick();
  const s = getOrderStatus(order);
  const cls = s.key === "cancelled" ? "bg-danger" : s.key === "delivered" ? "bg-success" : "bg-warning text-dark";
  return <span className={`badge ${cls}`}>{s.label}</span>;
}

function OrderStatus({ order }) {
  useTick();
  const s = getOrderStatus(order);

  if (s.key === "cancelled") {
    return <div className="alert alert-danger mb-0"><i className="bi bi-x-circle me-2"></i>This order was cancelled.</div>;
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
      {STATUS_STEPS.map((step, i) => {
        const done = i <= s.index;
        const current = i === s.index;
        return (
          <div key={step.key} className="text-md-center d-flex d-md-block align-items-center gap-3 flex-fill">
            <div
              className={`rounded-circle d-inline-flex align-items-center justify-content-center ${done ? "bg-success text-white" : "bg-light text-secondary border"}`}
              style={{ width: 48, height: 48, boxShadow: current ? "0 0 0 4px rgba(25,135,84,.25)" : "none" }}
            >
              <i className={`bi ${done && !current ? "bi-check-lg" : step.icon} fs-5`}></i>
            </div>
            <div className={`small mt-md-2 ${done ? "fw-semibold" : "text-muted"}`}>{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
export default OrderStatus;
