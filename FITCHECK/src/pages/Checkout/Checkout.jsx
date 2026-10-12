import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";
import { placeOrder } from "../../store/ordersSlice";
import { calcTotals } from "../../utils/orders";
import { AuthContext } from "../../context/AuthContext";
import OrderSummary from "../../components/Order/OrderSummary";
import PaymentMethods from "../../components/Order/PaymentMethods";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

const onlyDigits = (text) =>
  text
    .split("")
    .filter((ch) => ch >= "0" && ch <= "9")
    .join("");

const isDigits = (text) => text.length > 0 && onlyDigits(text) === text;

function isValidEmail(email) {
  const value = email.trim();
  const parts = value.split("@");

  if (parts.length !== 2 || value.includes(" ")) return false;

  const [name, domain] = parts;
  const dot = domain.lastIndexOf(".");

  return name.length > 0 && dot > 0 && dot < domain.length - 1;
}

function isValidPhone(phone) {
  const value = phone.split(" ").join("");
  const number = value.startsWith("+") ? value.slice(1) : value;

  return isDigits(number) && number.length >= 10 && number.length <= 14;
}

function isValidExpiry(expiry) {
  const [month, year, extra] = expiry.split("/");

  if (extra !== undefined || !month || !year) return false;
  if (month.length !== 2 || year.length !== 2) return false;
  if (!isDigits(month) || !isDigits(year)) return false;

  return Number(month) >= 1 && Number(month) <= 12;
}

function validate(form, payment, card) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = "Please enter your full name";
  }

  if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email";
  }

  if (!isValidPhone(form.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (form.address.trim().length < 8) {
    errors.address = "Enter your full address";
  }

  if (form.city.trim().length < 2) {
    errors.city = "Enter your city";
  }

  if (payment === "card") {
    const cardDigits = onlyDigits(card.number);

    if (cardDigits.length < 13 || cardDigits.length > 19) {
      errors.cardNumber = "Invalid card number";
    }

    if (!isValidExpiry(card.expiry)) {
      errors.cardExpiry = "Use MM/YY";
    }

    if (!isDigits(card.cvv) || card.cvv.length < 3 || card.cvv.length > 4) {
      errors.cardCvv = "Invalid CVV";
    }
  }

  if (payment === "wallet" && !isValidPhone(card.wallet)) {
    errors.walletNumber = "Enter your wallet number";
  }

  return errors;
}

function Field({
  label,
  name,
  form,
  setForm,
  errors,
  type = "text",
  col = "col-12",
  as,
}) {
  const Tag = as || "input";

  return (
    <div className={col}>
      <label className="form-label small fw-semibold">{label}</label>

      <Tag
        type={as ? undefined : type}
        rows={as ? 2 : undefined}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        value={form[name]}
        onChange={(e) =>
          setForm({
            ...form,
            [name]: e.target.value,
          })
        }
      />

      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
}

function Checkout() {
  const {user} = useContext(AuthContext);

  const items = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);

  const [payment, setPayment] = useState("cod");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    wallet: "",
  });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const found = validate(form, payment, card);

    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    setSubmitting(true);

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const action = dispatch(
      placeOrder({
        items,

        customer: {
          ...form,
          email: user?.email || form.email,
          userEmail: user?.email || null,
          guest: !user,
        },

        payment: {
          method: payment,

          last4:
            payment === "card"
              ? card.number.replace(/\s/g, "").slice(-4)
              : null,
        },

        totals: calcTotals(subtotal),
      }),
    );

    // Get the new order ID
    const orderId = action.payload.id;

    // Go to Order Confirmation
    navigate(`/order-confirmation/${orderId}`, {
      replace: true,
    });
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">Checkout</h2>

      <p className="text-muted mb-4">
        Checking out as a guest - no account needed.
        <span className="text-muted"> Have an account? Login coming soon.</span>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          {/* LEFT SIDE */}

          <div className="col-lg-8">
            <div
              className="card border-0 shadow-sm p-4 mb-4"
              style={{ borderRadius: "15px" }}
            >
              <h5 className="fw-bold mb-3">
                <i className="bi bi-person me-2"></i>
                Guest Checkout - Contact & Shipping
              </h5>

              <div className="row g-3">
                <Field
                  label="Full name"
                  name="name"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  col="col-md-6"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />

                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  col="col-md-6"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />

                <Field
                  label="Address"
                  name="address"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />

                <Field
                  label="City"
                  name="city"
                  col="col-md-6"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />

                <Field
                  label="Order notes (optional)"
                  name="notes"
                  as="textarea"
                  form={form}
                  setForm={setForm}
                  errors={errors}
                />
              </div>
            </div>

            {/* PAYMENT */}

            <div
              className="card border-0 shadow-sm p-4"
              style={{ borderRadius: "15px" }}
            >
              <h5 className="fw-bold mb-3">
                <i className="bi bi-wallet2 me-2"></i>
                Payment Method
              </h5>

              <PaymentMethods
                value={payment}
                onChange={setPayment}
                card={card}
                onCardChange={setCard}
                errors={errors}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-4">
            <OrderSummary items={items}>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-5"
                disabled={submitting}
              >
                {submitting ? "Placing order..." : "Place Order"}
              </button>

              <Link to="/cart" className="d-block text-center mt-3 small">
                Back to cart
              </Link>
            </OrderSummary>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
