"use client";

import { useState } from "react";

const logoUrl =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/04/tiberino_logo_1_2025-copia.webp";
const heroImage =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/07/TIBERINO-ORIZZONTALE-copia-copia.png";
const footerImage =
  "https://labs.atlantasrl.com/tiberino/wp-content/uploads/2026/07/TIBERINO-ORIZZONTALE-copia-copia-copia.png";

const policyLinks = [
  ["Informativa sui rimborsi", "https://tiberino.com/policies/refund-policy"],
  ["Informativa sulla privacy", "https://tiberino.com/policies/privacy-policy"],
  ["Termini e condizioni del servizio", "https://tiberino.com/policies/terms-of-service"],
  ["Informativa sulle spedizioni", "https://tiberino.com/policies/shipping-policy"],
  ["Recapiti", "https://tiberino.com/policies/contact-information"],
  ["Informativa legale", "https://tiberino.com/policies/legal-notice"],
  ["Preferenze cookie", "https://tiberino.com/policies/#shopifyReshowConsentBanner"],
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

function Field({ id, label, type = "text", required = true, children }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {children || <input id={id} name={id} type={type} required={required} />}
    </label>
  );
}

export default function Home() {
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
      message: "Invio richiesta in corso...",
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
      const result = await response.json().catch(() => ({
        message: "Non è stato possibile inviare la richiesta.",
      }));

      if (!response.ok) {
        throw new Error(result.message || "Non è stato possibile inviare la richiesta.");
      }

      form.reset();
      setSubmitState({
        status: "success",
        message: result.message,
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
        <a className="brand" href="https://www.tiberino.com" target="_blank">
          <img src={logoUrl} alt="Tiberino" />
        </a>

        <nav className="header-actions" aria-label="Contatti Tiberino">
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
            Visita il sito web
          </a>
        </nav>
      </header>

      <section className="image-section" aria-label="Tiberino">
        <img src={heroImage} alt="Tiberino dal 1888" />
      </section>

      <section className="form-section">
        <div className="form-shell">
          <div className="form-copy">
            <p className="kicker" style={{textAlign:'center'}}>TIBERINO DAL 1888</p>
            <h1 style={{textAlign:'center'}}>RICHIEDI UNA<br/>VALUTAZIONE</h1>
            <p style={{textAlign:'center'}}>
              Compila il form con i tuoi dati.
              <br />
              Sarà cura del nostro team ricontattarti nel più breve tempo possibile.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <Field id="nome" label="Nome e cognome" />
              <Field id="attivita" label="Nome attività" />
              <Field id="email" label="Email" type="email" />
              <Field id="telefono" label="Telefono" type="tel" />
              <Field id="tipo" label="Tipo di attività">
                <select id="tipo" name="tipo" required>
                  <option value="">Seleziona</option>
                  <option>Negozio alimentare</option>
                  <option>Gastronomia</option>
                  <option>Enoteca</option>
                  <option>Concept store</option>
                  <option>Altro</option>
                </select>
              </Field>
              <Field id="citta" label="Città attività" />
            </div>

            <Field id="interesse" label="Perché sei interessato a Tiberino?">
              <textarea id="interesse" name="interesse" rows="4" required />
            </Field>

            <Field id="inserimento" label="Come pensi di inserirlo nel tuo negozio?">
              <textarea id="inserimento" name="inserimento" rows="4" required />
            </Field>

            <fieldset className="radio-group">
              <legend>Hai già fatto degustazioni in negozio?</legend>
              <label>
                <input type="radio" name="degustazioni" value="Sì" required />
                <span>Sì</span>
              </label>
              <label>
                <input type="radio" name="degustazioni" value="No" required />
                <span>No</span>
              </label>
            </fieldset>

            <label className="consent">
              <input name="consenso" type="checkbox" required />
              <span>
                Ho capito che la collaborazione prevede una fase iniziale di valutazione e
                degustazione
              </span>
            </label>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={submitState.status === "loading"}
              >
                {submitState.status === "loading" ? "Invio..." : "Invia richiesta"}
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

      <section className="image-section" aria-label="Tiberino prodotti">
        <img src={footerImage} alt="Tiberino prodotti" />
      </section>

      <footer className="subfooter">
        <p>
          © 2026,{" "}
          <a href="https://tiberino.com/" target="_blank">
            TIBERINO 1888
          </a>{" "}
          Powered by SudAlimenta Srl
        </p>
        <nav aria-label="Informative Tiberino">
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
