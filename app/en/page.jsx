"use client";

import { useState } from "react";

const logoUrl =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/04/tiberino_logo_1_2025-copia.webp";
const heroImage =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/07/TIBERINO-ORIZZONTALE-copia-copia.png";
const footerImage =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/07/TIBERINO-ORIZZONTALE-copia-copia-copia.png";

const policyLinks = [
  ["Refund Policy", "https://tiberino.com/policies/refund-policy"],
  ["Privacy Policy", "https://tiberino.com/policies/privacy-policy"],
  ["Terms of Service", "https://tiberino.com/policies/terms-of-service"],
  ["Shipping Policy", "https://tiberino.com/policies/shipping-policy"],
  ["Contact Information", "https://tiberino.com/policies/contact-information"],
  ["Legal Notice", "https://tiberino.com/policies/legal-notice"],
  ["Cookie Preferences", "https://tiberino.com/policies/#shopifyReshowConsentBanner"],
];

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="contact-icon">
      <path d="M6.6 10.8c1.5 3 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.7 21.4 2.6 13.3 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="contact-icon">
      <path d="M3.5 5h17c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-17c-.8 0-1.5-.7-1.5-1.5v-11C2 5.7 2.7 5 3.5 5Zm.9 2 7.6 5.3L19.6 7H4.4Zm15.6 2.1-7.2 5c-.5.4-1.1.4-1.6 0L4 9.1V17h16V9.1Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="contact-icon">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3.2a16 16 0 0 0-1.2-5A8.1 8.1 0 0 1 18.9 11ZM12 4.1c.7 1 1.5 3.2 1.8 6.9h-3.6c.3-3.7 1.1-5.9 1.8-6.9ZM4.1 13h3.2a16 16 0 0 0 1.2 5 8.1 8.1 0 0 1-4.4-5Zm3.2-2H4.1a8.1 8.1 0 0 1 4.4-5 16 16 0 0 0-1.2 5Zm4.7 8.9c-.7-1-1.5-3.2-1.8-6.9h3.6c-.3 3.7-1.1 5.9-1.8 6.9Zm2.5-1.9a16 16 0 0 0 1.2-5h3.2a8.1 8.1 0 0 1-4.4 5Zm1.4-7a20 20 0 0 0-.9-5h.1a8.1 8.1 0 0 1 3.8 5h-3Zm-6.8 0a20 20 0 0 1 .9-5h4a20 20 0 0 1 .9 5H9.1Zm0 2h5.8a20 20 0 0 1-.9 5h-4a20 20 0 0 1-.9-5Z" />
    </svg>
  );
}

function Field({ id, label, type = "text", required = true, children }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {children || <input id={id} name={id} type={type} required={required} />}
    </label>
  );
}

export default function EnglishPage() {
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setSubmitState({
      status: "loading",
      message: "Sending request...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          consenso: data.consenso === "on",
        }),
      });

      if (!response.ok) {
        throw new Error("We could not send your request. Please try again later.");
      }

      form.reset();
      setSubmitState({
        status: "success",
        message: "Your request has been sent successfully.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error.message,
      });
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="https://b2b.tiberino.com" target="_blank">
          <img src={logoUrl} alt="Tiberino" />
        </a>

        <nav className="mobile-icon-actions" aria-label="Quick Tiberino links">
          <a className="icon-button" href="https://b2b.tiberino.com" target="_blank" aria-label="Visit B2B Tiberino website">
            <GlobeIcon />
          </a>
          <a className="icon-button" href="tel:+390805046600" aria-label="Call Tiberino">
            <PhoneIcon />
          </a>
          <a className="icon-button" href="mailto:info@tiberino.com" aria-label="Email Tiberino">
            <MailIcon />
          </a>
        </nav>

        <nav className="header-actions" aria-label="Tiberino contacts">
          <div className="contact-list">
            <a className="contact-link" href="tel:+390805046600">
              <PhoneIcon />
              <span>080 5046600</span>
            </a>
            <a className="contact-link" href="mailto:info@tiberino.com">
              <MailIcon />
              <span>info@tiberino.com</span>
            </a>
          </div>
          <a className="website-button" href="https://www.tiberino.com" target="_blank">
            Visit B2B website
          </a>
        </nav>
      </header>

      <section className="image-section" aria-label="Tiberino">
        <img src={heroImage} alt="Tiberino since 1888" />
      </section>

      <section className="form-section">
        <div className="form-shell">
          <div className="form-copy">
            <p className="kicker" style={{ textAlign: "center" }}>TIBERINO SINCE 1888</p>
            <h1 style={{ textAlign: "center" }}>REQUEST A<br />CONTACT</h1>
            <p style={{ textAlign: "center" }}>
              Fill in the form with your details.
              <br />
              Our team will contact you as soon as possible.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <Field id="nome" label="Full name*" />
              <Field id="attivita" label="Business name*" />
              <Field id="email" label="Email*" type="email" />
              <Field id="telefono" label="Phone*" type="tel" />
              <Field id="tipo" label="Business type*">
                <select id="tipo" name="tipo" required>
                  <option value="">Select</option>
                  <option>Food store</option>
                  <option>Deli</option>
                  <option>Wine shop</option>
                  <option>Concept store</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field id="citta" label="Business city*" />
            </div>

            <Field id="interesse" label="Why are you interested in Tiberino?*">
              <textarea id="interesse" name="interesse" rows="4" required />
            </Field>

            <Field id="inserimento" label="How do you plan to introduce it in your store?*">
              <textarea id="inserimento" name="inserimento" rows="4" required />
            </Field>

            <fieldset className="radio-group">
              <legend>Have you already hosted in-store tastings?*</legend>
              <label>
                <input type="radio" name="degustazioni" value="Yes" required />
                <span>Yes</span>
              </label>
              <label>
                <input type="radio" name="degustazioni" value="No" required />
                <span>No</span>
              </label>
            </fieldset>


            <label className="consent">
              <input name="privacy" type="checkbox" required />
              <span>
                I have read and accept the{" "}
                <a href="https://tiberino.com/policies/privacy-policy" target="_blank">Privacy Policy</a>{" "}
                and the{" "}
                <a href="https://tiberino.com/policies/terms-of-service" target="_blank">Terms of Service*</a>
              </span>
            </label>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={submitState.status === "loading"}
              >
                {submitState.status === "loading" ? "Sending..." : "Submit request"}
              </button>
              {submitState.message ? (
                <p className={`form-message ${submitState.status}`} role="status">
                  {submitState.message}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <section className="image-section" aria-label="Tiberino products">
        <img src={footerImage} alt="Tiberino products" />
      </section>

      <footer className="subfooter">
        <p>
          © 2026,{" "}
          <a href="https://tiberino.com/" target="_blank">
            TIBERINO 1888
          </a>{" "}
          Powered by SudAlimenta Srl
        </p>
        <nav aria-label="Tiberino policies">
          {policyLinks.map(([label, href]) => (
            <a key={href} href={href} target="_blank">
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
