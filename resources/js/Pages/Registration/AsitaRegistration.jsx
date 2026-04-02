import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AsitaRegistration() {
  const { data, setData, post, processing, errors } = useForm({
    company_name: "",
    name: "",
    position: "",
    nia: "",
    company_address: "",
    company_phone: "",
    phone: "",
    email: "",
    website: "",
    social_media: "",
    commission_type: "A",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setSplashPhase(1), 200);
    const t2 = setTimeout(() => setSplashPhase(2), 3000);
    const t3 = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = "auto";
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.body.style.overflow = "auto"; };
  }, []);

  const handleChange = ({ target: { name, value } }) => setData(name, value);

  const nextStep = () => {
    if (currentStep === 0 && (!data.company_name || !data.nia || !data.company_address || !data.company_phone)) {
      alert("Mohon lengkapi data identitas perusahaan"); return;
    }
    if (currentStep === 1 && (!data.name || !data.position || !data.phone)) {
      alert("Mohon lengkapi data identitas peserta"); return;
    }
    setCurrentStep(p => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => { setCurrentStep(p => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleSubmit = (e) => { e.preventDefault(); post(route("asita.submit_form")); };

  const steps = ["Identitas Perusahaan", "Identitas Peserta", "Konfirmasi"];

  return (
    <>
      <Head title="Pendaftaran — RAKERDA 1 ASITA JABAR" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
        *, *::before, *::after { font-family: 'Poppins', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0C1E5B; overflow: hidden; }
        body.form-ready { overflow-x: hidden; overflow-y: auto; }

        /* ─── SPLASH ─── */
        .splash {
          position: fixed; inset: 0; z-index: 9999;
          background: #104097;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
          transition: clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1);
          clip-path: inset(0 0 0% 0);
        }
        .splash.exit { clip-path: inset(0 0 100% 0); }

        /* diagonal yellow stripe */
        .splash-stripe {
          position: absolute;
          width: 200%; height: 180px;
          background: #FBBF24;
          transform: rotate(-8deg) translateY(60px);
          bottom: -40px; left: -50%;
          opacity: 0.12;
        }
        .splash-stripe-2 {
          position: absolute;
          width: 200%; height: 60px;
          background: #FBBF24;
          transform: rotate(-8deg) translateY(0px);
          bottom: 80px; left: -50%;
          opacity: 0.07;
        }

        /* top accent bar */
        .splash-topbar {
          position: absolute; top: 0; left: 0; right: 0; height: 6px;
          background: linear-gradient(90deg, #FBBF24 0%, #F59E0B 50%, #FBBF24 100%);
        }

        /* corner bracket */
        .splash-corner {
          position: absolute; width: 40px; height: 40px;
          border-color: rgba(251,191,36,0.3); border-style: solid;
        }
        .splash-corner.tl { top: 24px; left: 24px; border-width: 2px 0 0 2px; }
        .splash-corner.br { bottom: 24px; right: 24px; border-width: 0 2px 2px 0; }

        .splash-inner { text-align: center; padding: 0 24px; position: relative; z-index: 2; width: 100%; max-width: 700px; }

        .splash-logo {
          height: 90px; object-fit: contain;
          filter: brightness(10);
          display: block; margin: 0 auto 24px;
          opacity: 0; transform: scale(0.85);
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s;
        }
        .splash-logo.in { opacity: 1; transform: scale(1); }

        .splash-badge {
          display: inline-block;
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.35);
          color: #FBBF24;
          font-size: 8px; font-weight: 800; letter-spacing: 0.45em;
          text-transform: uppercase;
          padding: 7px 20px; margin-bottom: 20px;
          opacity: 0; transform: translateY(12px);
          transition: all 0.5s ease 0.2s;
        }
        .splash-badge.in { opacity: 1; transform: translateY(0); }

        .splash-t1-wrap, .splash-t2-wrap { overflow: hidden; }
        .splash-t1 {
          display: block;
          font-size: clamp(64px, 16vw, 148px);
          font-weight: 900; color: #fff; line-height: 0.87;
          letter-spacing: -0.04em; text-transform: uppercase;
          transform: translateY(110%);
          transition: transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }
        .splash-t1.in { transform: translateY(0); }

        .splash-t2 {
          display: block;
          font-size: clamp(16px, 4.5vw, 40px);
          font-weight: 900; color: #FBBF24;
          letter-spacing: 0.22em; text-transform: uppercase;
          transform: translateY(110%);
          transition: transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s;
          margin-bottom: 32px;
        }
        .splash-t2.in { transform: translateY(0); }

        .splash-div {
          width: 0; height: 3px; background: rgba(255,255,255,0.2);
          margin: 0 auto 28px;
          transition: width 0.6s ease 0.45s;
        }
        .splash-div.in { width: 80px; }

        .splash-tagline {
          font-size: clamp(10px, 1.8vw, 14px); font-weight: 600;
          color: rgba(255,255,255,0.55); font-style: italic;
          letter-spacing: 0.05em; max-width: 480px; line-height: 1.6;
          opacity: 0; transform: translateY(10px);
          transition: all 0.6s ease 0.6s;
        }
        .splash-tagline.in { opacity: 1; transform: translateY(0); }

        /* date pill */
        .splash-date {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 28px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          padding: 10px 24px;
          opacity: 0;
          transition: opacity 0.5s ease 0.7s;
        }
        .splash-date.in { opacity: 1; }
        .splash-date-dot { width: 6px; height: 6px; border-radius: 50%; background: #FBBF24; }
        .splash-date-text { font-size: 10px; font-weight: 800; letter-spacing: 0.3em; color: rgba(255,255,255,0.7); text-transform: uppercase; }

        /* ─── MAIN PAGE ─── */
        .page { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; }

        .bg-fixed { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .bg-img { position: absolute; inset: 0; background-image: url('/images/asita_meeting_bg.png'); background-size: cover; background-position: center; opacity: 0.07; }
        .bg-grad { position: absolute; inset: 0; background: linear-gradient(160deg, #0D2272 0%, #0C1E5B 45%, #091648 100%); }
        .bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .bg-glow-top { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 70vw; height: 50vh; background: radial-gradient(ellipse, rgba(30,80,200,0.35) 0%, transparent 65%); }
        .bg-glow-yellow { position: absolute; bottom: 20%; right: -5%; width: 30vw; height: 30vh; background: radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%); }

        /* ─── HEADER ─── */
        .header {
          position: relative; z-index: 10;
          padding: 52px 24px 36px; text-align: center;
          transition: opacity 1s ease, transform 1s ease;
        }
        .header.hidden { opacity: 0; transform: translateY(-16px); }
        .header.show { opacity: 1; transform: translateY(0); }

        .header-logo { height: 100px; object-fit: contain; filter: brightness(10); margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }

        .header-eyebrow { font-size: 8px; font-weight: 800; letter-spacing: 0.5em; color: #FBBF24; text-transform: uppercase; margin-bottom: 8px; opacity: 0.8; }
        .header-title { font-size: clamp(48px, 10vw, 88px); font-weight: 900; color: #fff; line-height: 0.88; letter-spacing: -0.04em; text-transform: uppercase; }
        .header-sub { font-size: clamp(13px, 3vw, 18px); font-weight: 800; color: #FBBF24; letter-spacing: 0.35em; text-transform: uppercase; margin-top: 8px; }

        /* ─── STEP NAV ─── */
        .step-nav { display: flex; align-items: flex-start; justify-content: center; max-width: 520px; margin: 36px auto 0; padding: 0 16px; position: relative; z-index: 10; }
        .step-item { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; position: relative; }
        .step-item:not(:last-child)::after {
          content: ''; position: absolute; top: 19px;
          left: calc(50% + 22px); right: calc(-50% + 22px);
          height: 1px; background: rgba(255,255,255,0.1); transition: background 0.4s;
        }
        .step-item.step-done:not(:last-child)::after { background: #FBBF24; }

        .step-circle {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 900;
          border: 2px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.25);
          position: relative; z-index: 1; transition: all 0.35s ease;
        }
        .step-circle.active { border-color: #FBBF24; color: #07112B; background: #FBBF24; box-shadow: 0 0 20px rgba(251,191,36,0.35); }
        .step-circle.done { border-color: rgba(251,191,36,0.4); color: #FBBF24; background: rgba(251,191,36,0.08); }

        .step-lbl { font-size: 6.5px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.2); text-align: center; line-height: 1.4; transition: color 0.35s; max-width: 70px; }
        .step-lbl.active { color: #FBBF24; }
        .step-lbl.done { color: rgba(255,255,255,0.4); }

        /* ─── FORM CARD ─── */
        .form-wrap { max-width: 800px; margin: 36px auto 0; padding: 0 16px; position: relative; z-index: 10; transition: opacity 0.8s ease, transform 0.8s ease; }
        .form-wrap.hidden { opacity: 0; transform: translateY(20px); }
        .form-wrap.show { opacity: 1; transform: translateY(0); }

        .form-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 52px 56px; position: relative; overflow: hidden;
          backdrop-filter: blur(24px);
        }
        .form-card::before, .form-card::after { content: ''; position: absolute; width: 28px; height: 28px; border-color: #FBBF24; border-style: solid; opacity: 0.4; }
        .form-card::before { top: 18px; left: 18px; border-width: 2px 0 0 2px; }
        .form-card::after { bottom: 18px; right: 18px; border-width: 0 2px 2px 0; }

        @media (max-width: 640px) { .form-card { padding: 32px 20px; } }

        .section-title {
          font-size: 8px; font-weight: 900; letter-spacing: 0.5em; text-transform: uppercase;
          color: #FBBF24; margin-bottom: 36px;
          display: flex; align-items: center; gap: 14px;
        }
        .section-title::after { content: ''; flex: 1; height: 1px; background: rgba(251,191,36,0.15); }

        /* ─── INPUTS ─── */
        .field { margin-bottom: 24px; }
        .field-lbl { display: block; font-size: 7.5px; font-weight: 900; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 8px; }
        .field-inp {
          width: 100%; padding: 15px 18px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
          color: #fff; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;
          transition: all 0.25s ease; -webkit-appearance: none;
        }
        .field-inp::placeholder { color: rgba(255,255,255,0.22); font-weight: 400; }
        .field-inp:focus { outline: none; background: rgba(251,191,36,0.05); border-color: rgba(251,191,36,0.5); box-shadow: 0 0 0 3px rgba(251,191,36,0.07); color: #fff; }
        .field-err { font-size: 10px; font-weight: 700; color: #FCA5A5; margin-top: 5px; }

        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 580px) { .grid2 { grid-template-columns: 1fr; } }

        /* ─── COMMISSION ─── */
        .comm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
        .comm-card {
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; cursor: pointer;
          padding: 32px 16px; display: flex; flex-direction: column; align-items: center; gap: 10px;
          transition: all 0.3s ease;
        }
        .comm-card:hover { border-color: rgba(251,191,36,0.3); background: rgba(251,191,36,0.03); }
        .comm-card.sel { border-color: #FBBF24; background: rgba(251,191,36,0.06); box-shadow: 0 0 30px rgba(251,191,36,0.1); }
        .comm-letter { font-size: 40px; font-weight: 900; color: rgba(255,255,255,0.15); transition: all 0.3s; }
        .comm-card.sel .comm-letter { color: #FBBF24; text-shadow: 0 0 24px rgba(251,191,36,0.4); }
        .comm-lbl { font-size: 8px; font-weight: 900; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.25); transition: color 0.3s; }
        .comm-card.sel .comm-lbl { color: #FBBF24; }

        /* ─── BUTTONS ─── */
        .btn-row { display: flex; gap: 14px; margin-top: 44px; }
        .btn-primary {
          flex: 1; padding: 18px 28px;
          background: #104097; border: 1px solid rgba(255,255,255,0.1);
          color: #fff; font-size: 10px; font-weight: 900;
          letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'Poppins', sans-serif; position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(251,191,36,0.12) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.25s;
        }
        .btn-primary:hover:not(:disabled) { background: #1a52c0; transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(16,64,151,0.6); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

        .btn-secondary {
          flex: 1; padding: 18px 28px;
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5); font-size: 10px; font-weight: 900;
          letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'Poppins', sans-serif;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }

        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.16,1,0.3,1) both; }

        /* ─── FOOTER ─── */
        .footer { position: relative; z-index: 10; margin-top: auto; padding: 56px 24px 40px; border-top: 1px solid rgba(255,255,255,0.12); text-align: center; }

        .footer-date { font-size: 13px; font-weight: 800; letter-spacing: 0.25em; color: #fff; text-transform: uppercase; margin-bottom: 28px; }

        .footer-contacts { display: flex; align-items: stretch; justify-content: center; gap: 0; margin-bottom: 36px; flex-wrap: wrap; }

        .footer-contact {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 20px 36px;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.25s ease;
          min-width: 200px;
        }
        .footer-contact:first-child { border-right: none; }
        .footer-contact:hover { background: rgba(16,64,151,0.3); border-color: rgba(251,191,36,0.3); }
        .footer-contact-lbl { font-size: 7px; font-weight: 800; letter-spacing: 0.4em; text-transform: uppercase; color: #FBBF24; opacity: 0.75; }
        .footer-contact-link { font-size: 16px; font-weight: 800; color: #fff; text-decoration: none; letter-spacing: 0.05em; }
        .footer-contact-link:hover { color: #FBBF24; }

        @media (max-width: 480px) {
          .footer-contact:first-child { border-right: 1px solid rgba(255,255,255,0.15); border-bottom: none; }
          .footer-contacts { flex-direction: column; align-items: center; }
          .footer-contact { width: 100%; max-width: 280px; }
        }

        .footer-copy { font-size: 8px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.18); margin-top: 28px; }
        .footer-copy span { color: #FBBF24; opacity: 0.7; }

        /* print hidden */
        @media print { .pdf-ticket { display: block !important; } }
      `}</style>

      {/* ── SPLASH ── */}
      {showSplash && (
        <div className={`splash${splashPhase === 2 ? " exit" : ""}`}>
          <div className="splash-topbar" />
          <div className="splash-stripe" />
          <div className="splash-stripe-2" />
          <div className="splash-corner tl" />
          <div className="splash-corner br" />

          <div className="splash-inner">
            <img src="/images/Asitajpeg-removebg-preview.png" alt="ASITA" className={`splash-logo${splashPhase >= 1 ? " in" : ""}`} />
            <div className={`splash-badge${splashPhase >= 1 ? " in" : ""}`}>Association of Indonesian Tours &amp; Travel Agencies</div>

            <div className="splash-t1-wrap">
              <span className={`splash-t1${splashPhase >= 1 ? " in" : ""}`}>RAKERDA 1</span>
            </div>
            <div className="splash-t2-wrap">
              <span className={`splash-t2${splashPhase >= 1 ? " in" : ""}`}>DPD ASITA JABAR</span>
            </div>

            <div className={`splash-div${splashPhase >= 1 ? " in" : ""}`} />
            <p className={`splash-tagline${splashPhase >= 1 ? " in" : ""}`}>
              "Transformasi Digital ASITA Jawa Barat Melalui Inovasi dan Integrasi Teknologi"
            </p>

            <div className={`splash-date${splashPhase >= 1 ? " in" : ""}`}>
              <div className="splash-date-dot" />
              <span className="splash-date-text">Harris Hotel — 09 April 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="page" style={{ filter: showSplash ? "blur(10px)" : "none", transition: "filter 0.8s ease" }}>
        <div className="bg-fixed">
          <div className="bg-img" />
          <div className="bg-grad" />
          <div className="bg-grid" />
          <div className="bg-glow-top" />
          <div className="bg-glow-yellow" />
        </div>

        {/* HEADER */}
        <header className={`header ${isMounted && !showSplash ? "show" : "hidden"}`}>
          <img src="/images/Asitajpeg-removebg-preview.png" alt="ASITA" className="header-logo" />
          <p className="header-eyebrow">Formulir Pendaftaran Resmi</p>
          <h1 className="header-title">RAKERDA 1</h1>
          <p className="header-sub">DPD ASITA JABAR</p>

          {/* Step Nav */}
          <div className="step-nav">
            {steps.map((lbl, i) => (
              <div key={i} className={`step-item${i < currentStep ? " step-done" : ""}`}>
                <div className={`step-circle${i === currentStep ? " active" : i < currentStep ? " done" : ""}`}>
                  {i < currentStep
                    ? <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    : i + 1}
                </div>
                <span className={`step-lbl${i === currentStep ? " active" : i < currentStep ? " done" : ""}`}>{lbl}</span>
              </div>
            ))}
          </div>
        </header>

        {/* FORM */}
        <div className={`form-wrap ${isMounted && !showSplash ? "show" : "hidden"}`}>
          <div className="form-card">
            <form onSubmit={handleSubmit}>

              {/* STEP 1 */}
              {currentStep === 0 && (
                <div className="slide-in">
                  <p className="section-title">01 — Identitas Perusahaan</p>
                  <div className="grid2">
                    <div className="field">
                      <label className="field-lbl">Nama Perusahaan (PT/CV)</label>
                      <input type="text" name="company_name" value={data.company_name} onChange={handleChange} placeholder="PT. Wisata Jaya" className="field-inp" required />
                      {errors.company_name && <p className="field-err">{errors.company_name}</p>}
                    </div>
                    <div className="field">
                      <label className="field-lbl">No Register ASITA (NIA)</label>
                      <input type="text" name="nia" value={data.nia} onChange={handleChange} placeholder="Nomor NIA" className="field-inp" required />
                      {errors.nia && <p className="field-err">{errors.nia}</p>}
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-lbl">Alamat Perusahaan</label>
                    <textarea name="company_address" value={data.company_address} onChange={handleChange} placeholder="Alamat lengkap kantor" className="field-inp" style={{ minHeight: 90, resize: "vertical" }} required />
                    {errors.company_address && <p className="field-err">{errors.company_address}</p>}
                  </div>
                  <div className="grid2">
                    <div className="field">
                      <label className="field-lbl">No Telpon/HP Kantor</label>
                      <input type="tel" name="company_phone" value={data.company_phone} onChange={handleChange} placeholder="0221234567" className="field-inp" required />
                      {errors.company_phone && <p className="field-err">{errors.company_phone}</p>}
                    </div>
                    <div className="field">
                      <label className="field-lbl">Website</label>
                      <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="www.perusahaan.com" className="field-inp" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-lbl">Media Sosial</label>
                    <input type="text" name="social_media" value={data.social_media} onChange={handleChange} placeholder="@perusahaan" className="field-inp" />
                  </div>
                  <div className="btn-row" style={{ justifyContent: "flex-end" }}>
                    <button type="button" onClick={nextStep} className="btn-primary" style={{ maxWidth: 220 }}>
                      Berikutnya <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 1 && (
                <div className="slide-in">
                  <p className="section-title">02 — Identitas Peserta</p>
                  <div className="grid2">
                    <div className="field">
                      <label className="field-lbl">Nama Peserta Yang Hadir</label>
                      <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Nama Lengkap & Gelar" className="field-inp" required />
                    </div>
                    <div className="field">
                      <label className="field-lbl">Jabatan Peserta</label>
                      <input type="text" name="position" value={data.position} onChange={handleChange} placeholder="Direktur / Manager / Staff" className="field-inp" required />
                    </div>
                  </div>
                  <div className="grid2">
                    <div className="field">
                      <label className="field-lbl">No HP (WhatsApp Aktif)</label>
                      <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="08123456789" className="field-inp" required />
                    </div>
                    <div className="field">
                      <label className="field-lbl">Email</label>
                      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="alamat@email.com" className="field-inp" />
                    </div>
                  </div>
                  <div className="btn-row">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      Kembali
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Berikutnya <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 2 && (
                <div className="slide-in">
                  <p className="section-title">03 — Pembagian Komisi</p>
                  <div className="comm-grid">
                    {["A", "B"].map(t => (
                      <button key={t} type="button" onClick={() => setData("commission_type", t)} className={`comm-card${data.commission_type === t ? " sel" : ""}`}>
                        <span className="comm-letter">{t}</span>
                        <span className="comm-lbl">Komisi {t}</span>
                      </button>
                    ))}
                  </div>
                  <div className="btn-row">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      Kembali
                    </button>
                    <button type="submit" disabled={processing} className="btn-primary">
                      {processing ? "Memproses..." : <>Submit Pendaftaran <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg></>}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>

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
    </>
  );
}