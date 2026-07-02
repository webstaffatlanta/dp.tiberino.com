import nodemailer from "nodemailer";

const recipient = process.env.CONTACT_TO || "webstaff@atlantasrl.com";

function getField(body, key) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function requireSmtpConfig() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
  return required.filter((key) => !process.env[key]);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  const body = await request.json();

  const fields = {
    nome: getField(body, "nome"),
    attivita: getField(body, "attivita"),
    email: getField(body, "email"),
    telefono: getField(body, "telefono"),
    tipo: getField(body, "tipo"),
    citta: getField(body, "citta"),
    interesse: getField(body, "interesse"),
    inserimento: getField(body, "inserimento"),
    degustazioni: getField(body, "degustazioni"),
  };

  const missingFields = Object.entries(fields)
    .filter(([key, value]) => key !== "consenso" && !value)
    .map(([key]) => key);

  if (missingFields.length) {
    return Response.json(
      { message: "Compila tutti i campi obbligatori prima di inviare." },
      { status: 400 },
    );
  }

  const missingConfig = requireSmtpConfig();
  if (missingConfig.length) {
    return Response.json(
      { message: "Invio email non configurato. Controlla le variabili SMTP." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const rows = [
    ["Nome e cognome", fields.nome],
    ["Nome attività", fields.attivita],
    ["Email", fields.email],
    ["Telefono", fields.telefono],
    ["Tipo di attività", fields.tipo],
    ["Città attività", fields.citta],
    ["Perché è interessato a Tiberino", fields.interesse],
    ["Come pensa di inserirlo nel negozio", fields.inserimento],
    ["Ha già fatto degustazioni in negozio", fields.degustazioni],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(
          label,
        )}</th><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "tiberino@atlantasrl.com",
      replyTo: fields.email,
      subject: "Richiesta valutazione Tiberino",
      text,
      html: `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <p>Un nuovo utente B2B ha richiesto la Valutazione Tiberino</p>
      ${htmlRows}</table>`,
    });
  } catch {
    return Response.json(
      { message: "Non è stato possibile inviare la richiesta. Riprova più tardi." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Richiesta inviata correttamente." });
}
