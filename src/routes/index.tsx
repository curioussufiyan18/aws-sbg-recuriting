import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Users, Code2, CalendarDays, PenTool, Megaphone, Sparkles, Cloud, MoveUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { roles, years, recruitmentYear, applicationSchema } from "@/lib/recruitment";
import { submitApplication } from "@/lib/applications.functions";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Build. Lead. Create. | AWS Student Builder Group MANUU" },
    { name: "description", content: "Apply for the 2026–27 core team of AWS Student Builder Group at MANUU. Five positions. A student-led community of cloud builders, leaders, and creators." },
    { property: "og:title", content: "Build. Lead. Create. — MANUU Core Team 2026–27" },
    { property: "og:description", content: "Five core team positions. Join the student-led AWS Student Builder Group at MANUU and help build what comes next." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand() {
  return <a className="brand" href="#top" aria-label="AWS Student Builder Group MANUU home"><div className="aws-mark">aws</div><div className="brand-copy">STUDENT BUILDER<br />GROUP<span>MAULANA AZAD NATIONAL URDU UNIVERSITY</span></div></a>;
}

function BuilderArtwork() {
  return <div className="builder-art" role="img" aria-label="Playful cloud builder illustration with an orange cloud, code window, and five core team positions announcement">
    <div className="art-grid" />
    <div className="recruitment-sticker">CORE TEAM RECRUITMENT <span>{recruitmentYear}</span></div>
    <MoveUpRight className="art-corner" />
    <div className="positions-sticker"><div>ONLY<strong>5</strong>CORE TEAM<br />POSITIONS</div></div>
    <span className="think-big">THINK BIG ↗</span>
    <svg className="cloud-art" viewBox="0 0 500 360" aria-hidden="true">
      <path className="cloud-shadow" d="M118 277C32 277 32 169 109 164C100 98 181 65 224 112C260 51 354 74 362 142C450 132 483 255 403 277Z" transform="translate(8 9)" />
      <path className="cloud-fill" d="M118 277C32 277 32 169 109 164C100 98 181 65 224 112C260 51 354 74 362 142C450 132 483 255 403 277Z" />
      <path className="ink-stroke" d="M159 104C145 106 136 113 131 127M124 139l-1 5" />
      <path className="paper-fill" d="M197 157l-44 35 44 35 14-17-24-18 24-18Z" />
      <path className="paper-fill" d="M290 157l44 35-44 35-14-17 24-18-24-18Z" />
      <path className="paper-fill" d="M251 146l-29 94 20 6 29-94Z" />
      <path className="ink-stroke" d="M351 290v32h50m-15-15 15 15-15 15" />
      <path className="ink-stroke" d="M48 89v-32h44m-14-14 14 14-14 14" />
      <path className="blue-fill" d="M80 297l12-18 4 22 22 4-18 12-3 22-14-17-22 3 13-18-7-21Z" />
      <circle className="yellow-fill" cx="419" cy="56" r="15" />
      <path className="ink-stroke" d="M30 229h-19m9-10v19M311 38V19m-9 9h18" />
    </svg>
    <div className="code-sticker"><div className="code-top"><i /><i /><i /><span>the-next-generation.js</span></div><div className="code-body"><span>const future = &#123;</span><br />&nbsp; <em>builders:</em> "you",<br />&nbsp; <em>possibilities:</em> "endless"<br />&#125;;</div></div>
    <svg className="spark-art" viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" stroke="var(--ink)" strokeWidth="2" d="M50 2l8 29 23-20-12 28 29 8-29 8 20 24-28-12-8 31-9-29-23 20 11-28-30-8 29-9-20-24 28 12Z" /></svg>
    <div className="build-sticker">LET’S BUILD WHAT’S NEXT. ↗</div>
  </div>;
}

const roleIcons = { community: Users, technical: Code2, events: CalendarDays, design: PenTool, outreach: Megaphone };
const benefits = [
  { icon: Cloud, title: "Learn by building", description: "Explore cloud computing and turn new skills into real projects." },
  { icon: Users, title: "Find your people", description: "Connect with curious students who want to build something meaningful." },
  { icon: Megaphone, title: "Lead with impact", description: "Own initiatives, bring ideas to life, and make a difference on campus." },
  { icon: Sparkles, title: "Grow beyond class", description: "Build confidence, experience, and a portfolio that tells your story." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [receipt, setReceipt] = useState<{ reference: string; name: string; role: string } | null>(null);
  const submit = useServerFn(submitApplication);
  const navigation = [{ name: "About", id: "about" }, { name: "Core Team", id: "core-team" }, { name: "Benefits", id: "benefits" }];

  function chooseRole(role: string) { setSelectedRole(role); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = applicationSchema.safeParse({ name: form.get("name"), email: form.get("email"), course: form.get("course"), year: form.get("year"), role: selectedRole, motivation: form.get("motivation"), consent: form.get("consent") === "on" });
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) { const field = issue.path[0]; if (typeof field === "string") nextErrors[field] = issue.message; }
      setErrors(nextErrors); return;
    }
    setErrors({}); setSubmitError(""); setSubmitting(true);
    try { setReceipt(await submit({ data: result.data })); }
    catch (error) { setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <div id="top">
    <header className="site-header"><div className="site-shell header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`} className="nav-link">{item.name}</a>)}<Button variant="campaign" asChild><a href="#apply">APPLY NOW <ArrowUpRight /></a></Button></nav><Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.name}</a>)}<Button variant="campaign" asChild><a href="#apply" onClick={() => setMenuOpen(false)}>APPLY NOW <ArrowUpRight /></a></Button></nav>}</header>
    <main>
      <section className="site-shell hero" aria-labelledby="hero-heading"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> MANUU × STUDENT TECH COMMUNITY</div><h1 id="hero-heading"><span>BUILD.</span><span className="headline-lead">LEAD.</span><span className="headline-create">CREATE.</span></h1><h2>Become the next generation of builders.</h2><p className="hero-description">Be part of a student-led technology community at MANUU. Help organize events, explore cloud computing, lead initiatives and create opportunities for students to learn and grow.</p><div className="hero-actions"><Button variant="campaign" asChild><a href="#apply">APPLY FOR CORE TEAM <ArrowUpRight /></a></Button><Button variant="campaignOutline" asChild><a href="#core-team">EXPLORE ROLES <ArrowDown /></a></Button></div><div className="hero-footer"><Users /> Student-led. Community-driven. Built for what’s next.</div></div><BuilderArtwork /></section>
      <div className="campaign-ticker" aria-hidden="true"><div className="ticker-inner"><span>BUILD TOGETHER</span><Sparkles /><span>LEARN BY DOING</span><Sparkles /><span>LEAD THE CHANGE</span><Sparkles /><span>THINK BIG. START HERE.</span><Sparkles /><span>BUILD TOGETHER</span><Sparkles /></div></div>
      <section id="about" className="content-section"><div className="site-shell about-grid"><div><div className="section-kicker">01 / THE COMMUNITY</div><h2 className="section-title">Not just a group.<br />A <span className="about-title-accent">builder mindset.</span></h2></div><div className="about-copy"><p>We’re the AWS Student Builder Group at MANUU — a student-led community for the curious, the creative, and the ones who ask, “What if?”</p><p>From cloud computing to campus events, we turn shared curiosity into hands-on experiences. Our next core team will help shape what we learn, what we create, and how we grow. That’s where you come in.</p></div></div></section>
      <section id="core-team" className="content-section"><div className="site-shell"><div className="section-heading"><div><div className="section-kicker">02 / FIND YOUR PLACE</div><h2 className="section-title">Five roles.<br />One big possibility.</h2></div><p>Different strengths. A shared ambition.<br />Find the role that feels like you.</p></div><div className="role-grid">{roles.map((role, index) => { const Icon = roleIcons[role.icon]; return <article className="role-card" key={role.name}><div className="role-icon-row"><div className="role-icon"><Icon size={23} /></div><span className="role-number">0{index + 1} / 05</span></div><span className="role-tag">{role.tag}</span><h3>{role.name}</h3><p>{role.description}</p><Button variant="link" className="role-apply" onClick={() => chooseRole(role.name)}>APPLY FOR THIS ROLE <ArrowUpRight /></Button></article>; })}<div className="role-callout"><div><Sparkles size={30} /><h3 className="mt-5">Your next chapter<br />starts here.</h3><p>Bring your curiosity, your ideas, and your willingness to show up.</p></div><Button variant="campaignOutline" asChild><a href="#apply">I’M IN <ArrowUpRight /></a></Button></div></div></div></section>
      <section id="benefits" className="content-section benefits-section"><div className="site-shell"><div className="section-kicker">03 / MORE THAN A TITLE</div><h2 className="section-title">Make an impact.<br />Take something with you.</h2><div className="benefits-grid">{benefits.map(benefit => <div className="benefit-item" key={benefit.title}><benefit.icon /><h3>{benefit.title}</h3><p>{benefit.description}</p></div>)}</div></div></section>
      <section id="apply" className="content-section"><div className="site-shell application-grid"><div className="application-intro"><div className="section-kicker">04 / YOUR MOVE</div><h2 className="section-title">Big ideas need<br />people like <span className="text-cobalt">you.</span></h2><p>Apply for the {recruitmentYear} core team. Tell us who you are, what excites you, and what you’d love to build with us.</p><div className="application-note"><ArrowUpRight size={19} /> 5 POSITIONS. YOUR OPPORTUNITY.</div></div>{receipt ? <div className="success-panel" role="status"><CheckCircle2 size={42} /><h3>You’re on the list, {receipt.name.split(" ")[0]}.</h3><p>Your application for <strong>{receipt.role}</strong> has been received. The team will review it and contact you at the email you provided.</p><div className="reference">APPLICATION REFERENCE / {receipt.reference}</div></div> : <form className="application-form" onSubmit={handleSubmit} noValidate><div className="form-row">{[{ name: "name", label: "FULL NAME", placeholder: "Your full name", type: "text", max: 100 }, { name: "email", label: "EMAIL ADDRESS", placeholder: "you@example.com", type: "email", max: 255 }].map(field => <div className="form-field" key={field.name}><label htmlFor={field.name}>{field.label} *</label><input id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} maxLength={field.max} required autoComplete={field.name === "name" ? "name" : "email"} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} />{errors[field.name] && <small id={`${field.name}-error`}>{errors[field.name]}</small>}</div>)}</div><div className="form-row"><div className="form-field"><label htmlFor="course">COURSE / DEPARTMENT *</label><input id="course" name="course" placeholder="e.g. B.Tech Computer Science" maxLength={100} required aria-invalid={Boolean(errors['course'])} />{errors['course'] && <small>{errors['course']}</small>}</div><div className="form-field"><label htmlFor="year">YEAR OF STUDY *</label><select id="year" name="year" defaultValue="" required aria-invalid={Boolean(errors['year'])}><option value="" disabled>Select your year</option>{years.map(year => <option key={year}>{year}</option>)}</select>{errors['year'] && <small>Please select your year of study.</small>}</div></div><div className="form-field"><label htmlFor="role">PREFERRED ROLE *</label><select id="role" name="role" value={selectedRole} onChange={event => setSelectedRole(event.target.value)} required aria-invalid={Boolean(errors['role'])}><option value="" disabled>Where would you like to make an impact?</option>{roles.map(role => <option key={role.name}>{role.name}</option>)}</select>{errors['role'] && <small>Please choose a core team role.</small>}</div><div className="form-field"><label htmlFor="motivation">WHY DO YOU WANT TO JOIN? *</label><textarea id="motivation" name="motivation" placeholder="Your ideas, your interests, and what you’d bring to the team…" maxLength={2000} required aria-invalid={Boolean(errors['motivation'])} />{errors['motivation'] && <small>{errors['motivation']}</small>}</div><label className="consent-row"><input type="checkbox" name="consent" required />I agree to share these details with the MANUU student community team for recruitment and to be contacted about my application.</label>{errors['consent'] && <p className="form-error">{errors['consent']}</p>}{submitError && <p className="form-error" role="alert">{submitError}</p>}<Button variant="campaign" className="submit-button" type="submit" disabled={submitting}>{submitting ? <>SUBMITTING <Loader2 className="animate-spin" /></> : <>LET’S BUILD TOGETHER <ArrowRight /></>}</Button><p className="form-fine-print">Your details stay private and are used only for core team recruitment.</p></form>}</div></section>
    </main><footer className="site-shell site-footer"><Brand /><p className="footer-note">© 2026 AWS Student Builder Group · MANUU<br />A student-led community. Not an AWS employee organization or an assertion of AWS sponsorship.</p></footer>
  </div>;
}
