import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function RegistrationSuccess({ registration }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      <Head title="Registrasi Berhasil — RAKERDA 1 ASITA JABAR" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&display=swap');
        *, *::before, *::after { font-family: 'Poppins', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0C1E5B; overflow-x: hidden; }

        /* BG */
        .bg-fixed { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .bg-img { position: absolute; inset: 0; background-image: url('/images/asita_meeting_bg.png'); background-size: cover; background-position: center; opacity: 0.07; }
        .bg-grad { position: absolute; inset: 0; background: linear-gradient(160deg, #0D2272 0%, #0C1E5B 45%, #091648 100%); }
        .bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 56px 56px; }
        .bg-glow { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 70vw; height: 50vh; background: radial-gradient(ellipse, rgba(30,80,200,0.35) 0%, transparent 65%); }

        /* PAGE */
        .page { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; }

        /* HEADER */
        .header { padding: 52px 24px 40px; text-align: center; transition: opacity 0.9s ease, transform 0.9s ease; }
        .header.hidden { opacity: 0; transform: translateY(-14px); }
        .header.show { opacity: 1; transform: translateY(0); }
        .header-logo { height: 88px; object-fit: contain; filter: brightness(10); margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; }
        .header-eyebrow { font-size: 8px; font-weight: 800; letter-spacing: 0.5em; color: #FBBF24; text-transform: uppercase; margin-bottom: 7px; opacity: 0.8; }
        .header-title { font-size: clamp(44px, 9vw, 80px); font-weight: 900; color: #fff; line-height: 0.88; letter-spacing: -0.04em; text-transform: uppercase; }
        .header-sub { font-size: clamp(12px, 2.5vw, 17px); font-weight: 800; color: #FBBF24; letter-spacing: 0.35em; text-transform: uppercase; margin-top: 7px; }

        /* MAIN */
        .main { flex: 1; padding: 0 16px 48px; max-width: 680px; margin: 0 auto; width: 100%; }

        /* SUCCESS CARD */
        .card {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
          padding: 52px 48px; position: relative; overflow: hidden;
          backdrop-filter: blur(24px); margin-bottom: 20px;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .card.hidden { opacity: 0; transform: translateY(18px); }
        .card.show { opacity: 1; transform: translateY(0); }

        /* yellow top accent line */
        .card-topline { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #104097, #FBBF24, #104097); }

        /* corner marks */
        .card::before, .card::after { content: ''; position: absolute; width: 24px; height: 24px; border-color: #FBBF24; border-style: solid; opacity: 0.35; }
        .card::before { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
        .card::after { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }

        @media (max-width: 580px) { .card { padding: 32px 20px; } }

        /* CHECK ICON */
        .check-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
        .check-circle {
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(16,64,151,0.3); border: 2px solid rgba(251,191,36,0.3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(16,64,151,0.4);
        }

        .success-title { font-size: clamp(24px, 5vw, 32px); font-weight: 900; color: #fff; letter-spacing: -0.02em; text-align: center; margin-bottom: 12px; }
        .success-sub { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.7; }
        .success-sub strong { color: #FBBF24; font-weight: 700; }

        /* DIVIDER */
        .card-div { height: 1px; background: rgba(255,255,255,0.07); margin: 32px 0; }

        /* QR SECTION */
        .qr-label { font-size: 7.5px; font-weight: 900; letter-spacing: 0.45em; text-transform: uppercase; color: rgba(255,255,255,0.3); text-align: center; margin-bottom: 24px; }
        .qr-wrap { display: flex; justify-content: center; margin-bottom: 24px; }
        .qr-box {
          padding: 16px; background: #fff;
          position: relative;
        }
        .qr-box::before, .qr-box::after {
          content: ''; position: absolute; width: 16px; height: 16px;
          border-color: #FBBF24; border-style: solid;
        }
        .qr-box::before { top: -4px; left: -4px; border-width: 3px 0 0 3px; }
        .qr-box::after { bottom: -4px; right: -4px; border-width: 0 3px 3px 0; }

        .reg-id-label { font-size: 7.5px; font-weight: 900; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.3); text-align: center; margin-bottom: 6px; }
        .reg-id { font-size: clamp(28px, 6vw, 40px); font-weight: 900; color: #FBBF24; letter-spacing: 0.18em; text-align: center; margin-bottom: 32px; text-shadow: 0 0 30px rgba(251,191,36,0.25); }

        /* ACTION BUTTONS */
        .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .action-grid { grid-template-columns: 1fr; } }

        .btn-dl, .btn-print {
          padding: 16px 20px; display: flex; align-items: center; justify-content: center; gap: 10px;
          font-size: 9px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase;
          text-decoration: none; cursor: pointer; transition: all 0.25s ease;
          font-family: 'Poppins', sans-serif; border: none;
        }
        .btn-dl { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); }
        .btn-dl:hover { border-color: rgba(255,255,255,0.35); color: #fff; background: rgba(255,255,255,0.04); }
        .btn-print { background: #104097; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .btn-print:hover { background: #1a52c0; transform: translateY(-2px); box-shadow: 0 10px 24px -6px rgba(16,64,151,0.6); }

        /* INFO NOTICE */
        .notice {
          background: rgba(16,64,151,0.12); border-left: 3px solid #FBBF24;
          padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start;
          margin-bottom: 20px;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .notice.hidden { opacity: 0; transform: translateY(14px); }
        .notice.show { opacity: 1; transform: translateY(0); }
        .notice-icon { flex-shrink: 0; width: 36px; height: 36px; background: #FBBF24; display: flex; align-items: center; justify-content: center; }
        .notice-title { font-size: 9px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #FBBF24; margin-bottom: 4px; }
        .notice-text { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.55); line-height: 1.6; }

        /* BACK LINK */
        .back-link { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s; padding: 16px 0; }
        .back-link:hover { color: #FBBF24; }
        .back-link svg { transition: transform 0.2s; }
        .back-link:hover svg { transform: translateX(-3px); }

        /* FOOTER */
        .footer { position: relative; z-index: 10; padding: 48px 24px 36px; border-top: 1px solid rgba(255,255,255,0.12); text-align: center; }
        .footer-date { font-size: 12px; font-weight: 800; letter-spacing: 0.25em; color: #fff; text-transform: uppercase; margin-bottom: 24px; }
        .footer-contacts { display: flex; align-items: stretch; justify-content: center; gap: 0; margin-bottom: 28px; flex-wrap: wrap; }
        .footer-contact { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 18px 32px; border: 1px solid rgba(255,255,255,0.15); transition: all 0.25s ease; min-width: 180px; }
        .footer-contact:first-child { border-right: none; }
        .footer-contact:hover { background: rgba(16,64,151,0.3); border-color: rgba(251,191,36,0.3); }
        .footer-contact-lbl { font-size: 7px; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: #FBBF24; opacity: 0.75; }
        .footer-contact-link { font-size: 15px; font-weight: 800; color: #fff; text-decoration: none; }
        .footer-contact-link:hover { color: #FBBF24; }
        @media (max-width: 420px) { .footer-contact:first-child { border-right: 1px solid rgba(255,255,255,0.15); border-bottom: none; } .footer-contacts { flex-direction: column; align-items: center; } .footer-contact { width: 100%; max-width: 260px; } }
        .footer-copy { font-size: 8px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.15); }
        .footer-copy span { color: #FBBF24; opacity: 0.7; }

        /* PRINT */
        @media print {
          body * { visibility: hidden; }
          .pdf-ticket, .pdf-ticket * { visibility: visible; }
          .pdf-ticket { display: block !important; position: fixed; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      {/* BG */}
      <div className="bg-fixed">
        <div className="bg-img" /><div className="bg-grad" />
        <div className="bg-grid" /><div className="bg-glow" />
      </div>

      <div className="page">
        {/* HEADER */}
        <header className={`header ${isVisible ? "show" : "hidden"}`}>
          <img src="/images/Asitajpeg-removebg-preview.png" alt="ASITA" className="header-logo" />
          <p className="header-eyebrow">Registrasi Berhasil</p>
          <h1 className="header-title">RAKERDA 1</h1>
          <p className="header-sub">DPD ASITA JABAR</p>
        </header>

        {/* MAIN */}
        <main className="main">

          {/* SUCCESS CARD */}
          <div className={`card ${isVisible ? "show" : "hidden"}`} style={{ transitionDelay: "0.15s" }}>
            <div className="card-topline" />

            <div className="check-wrap">
              <div className="check-circle">
                <svg width="36" height="36" fill="none" stroke="#FBBF24" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="success-title">Registrasi Berhasil!</h2>
            <p className="success-sub">
              E-Ticket QR Code Anda telah dikirimkan otomatis via WhatsApp ke nomor{" "}
              <strong>{registration.phone}</strong>.
            </p>

            {registration?.qr_url && (
              <>
                <div className="card-div" />
                <p className="qr-label">Personal E-Ticket Access</p>

                <div className="qr-wrap">
                  <div className="qr-box">
                    <img
                      src={registration.qr_url}
                      alt="QR Code"
                      style={{ width: 200, height: 200, display: "block" }}
                      onError={e => { e.target.onerror = null; e.target.src = "/images/no-qr.png"; }}
                    />
                  </div>
                </div>

                <p className="reg-id-label">Registration ID</p>
                <p className="reg-id">{registration?.unique_code}</p>

                <div className="action-grid">
                  <a
                    href={registration.qr_url}
                    download={`QR-ASITA-${registration?.unique_code}.png`}
                    className="btn-dl"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Unduh Gambar
                  </a>
                  <button onClick={handlePrint} className="btn-print">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Ekspor PDF
                  </button>
                </div>
              </>
            )}
          </div>

          {/* NOTICE */}
          <div className={`notice ${isVisible ? "show" : "hidden"}`} style={{ transitionDelay: "0.3s" }}>
            <div className="notice-icon">
              <svg width="18" height="18" fill="none" stroke="#07112B" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="notice-title">Panduan Registrasi Ulang</p>
              <p className="notice-text">Simpan file PDF ini. Tunjukkan ke petugas di lokasi acara untuk proses Check-in cepat.</p>
            </div>
          </div>

          {/* BACK */}
          <div style={{ textAlign: "center", paddingTop: 8 }}>
            <a href={route("asita.show_form")} className="back-link">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Pendaftaran
            </a>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p className="footer-date">Harris Hotel &mdash; 09 April 2026</p>
          <div className="footer-contacts">
            <div className="footer-contact">
              <span className="footer-contact-lbl">Admin ASITA</span>
              <a href="https://wa.me/6282113971389" target="_blank" rel="noopener noreferrer" className="footer-contact-link">0821-1397-1389</a>
            </div>
            <div className="footer-contact">
              <span className="footer-contact-lbl">Ibu Dewi</span>
              <a href="https://wa.me/628164864620" target="_blank" rel="noopener noreferrer" className="footer-contact-link">0816-4864-620</a>
            </div>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} ASITA JABAR • Powered by <span>Cyberlabs</span></p>
        </footer>
      </div>

      {/* PRINT TICKET */}
      <div className="pdf-ticket" style={{ display: "none" }}>
        <div style={{ padding: "48px", border: "6px solid #104097", maxWidth: 680, margin: "0 auto", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, paddingBottom: 24, borderBottom: "2px dashed #e2e8f0" }}>
            <img src="/images/Asitajpeg-removebg-preview.png" style={{ height: 64 }} alt="Logo" />
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: "#104097" }}>RAKERDA 1</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.2em", textTransform: "uppercase" }}>DPD ASITA JABAR</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 40, marginBottom: 32 }}>
            <div style={{ flex: 1 }}>
              {[["Nama Peserta", registration.name], ["Instansi / Biro", registration.company_name], ["Jabatan", registration.position], ["Registrasi ID", registration.unique_code]].map(([lbl, val]) => (
                <div key={lbl} style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 9, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{lbl}</p>
                  <p style={{ fontSize: lbl === "Registrasi ID" ? 18 : 16, fontWeight: 800, color: lbl === "Registrasi ID" ? "#0EA5E9" : "#1e293b" }}>{val}</p>
                </div>
              ))}
            </div>
            <div style={{ width: 160, height: 160, background: "#fff", padding: 8, border: "3px solid #f1f5f9" }}>
              {registration?.qr_url && <img src={registration.qr_url} style={{ width: "100%", height: "100%" }} alt="QR" />}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#f8fafc", padding: 20, marginBottom: 28 }}>
            {[["Venue", "Harris Hotel Bandung"], ["Tanggal & Waktu", "09 April 2026 · 08:30 WIB"]].map(([lbl, val]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>{lbl}</p>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#1e293b" }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", paddingTop: 20, borderTop: "2px dashed #e2e8f0" }}>
            <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, fontStyle: "italic", letterSpacing: "0.04em" }}>
              "Transformasi Digital ASITA Jawa Barat Melalui Inovasi dan Integrasi Teknologi"
            </p>
          </div>
        </div>
      </div>
    </>
  );
}