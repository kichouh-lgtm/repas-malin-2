const pill = "rounded-full bg-ink px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/75";
const Logo = () => (
  <a href="#" className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 16a5 5 0 0 1 .6-9.8A6 6 0 0 1 17 5.5a4.5 4.5 0 0 1 1 8.9V19H5v-3Z" /></svg>
    Repas Malin
  </a>
);

const STEPS = [
  ["01", "Choisissez vos sources", "Classique ou Thermomix : cochez les sites qui vous inspirent.", "couscous"],
  ["02", "Générez vos 7 recettes", "Une sélection aléatoire chaque semaine. Un doute ? Remplacez 2 ou 3 plats.", "pizza"],
  ["03", "Organisez votre semaine", "Glissez-déposez les recettes du lundi au dimanche.", "burger"],
  ["04", "Générez votre liste de courses", "Quantités cumulées et rangées par rayons, prêtes à cocher.", "grill"],
];

export function Top() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-12">
          <Logo />
          <nav className="hidden gap-8 text-[10px] uppercase tracking-[0.18em] md:flex">
            <a href="#fonctionnalites">Fonctionnalités</a><a href="#planner">Ma semaine</a><a href="#planner">Liste de courses</a><a href="#apropos">À propos</a>
          </nav>
          <a href="#planner" className={pill}>Planifier ma semaine</a>
        </div>
      </header>

      <section className="relative min-h-[600px] overflow-hidden">
        <img src="/img/linguine.jpg" alt="Assiette de linguine au parmesan" className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[62%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-cream/10 md:via-cream/40 md:to-transparent" />
        <div className="relative mx-auto flex min-h-[600px] max-w-[1200px] items-center gap-6 px-6 py-16 sm:px-12">
          <p className="hidden text-[10px] uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180 lg:block">Cuisinez. Planifiez. Profitez.</p>
          <div className="max-w-xl">
            <h1 className="font-display text-6xl font-light uppercase leading-[0.95] sm:text-7xl md:text-[5.5rem]">Le plaisir<br />de cuisiner.<br />Chaque jour.</h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/80">Repas Malin transforme la corvée des repas en plaisir quotidien. Moins de stress, moins de gaspillage, plus de temps pour ce qui compte vraiment.</p>
            <div className="mt-8 flex items-center gap-6">
              <a href="#planner" className={pill}>Planifier ma semaine</a>
              <a href="#fonctionnalites" className="text-[11px] uppercase tracking-[0.14em]">Découvrir ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="mx-auto max-w-[1200px] px-6 py-20 sm:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-light uppercase leading-tight md:text-5xl">Tout ce qu&apos;il vous faut,<br />dans une seule app.</h2>
          <p className="max-w-xs text-sm text-ink/70">Repas Malin vous accompagne à chaque étape pour manger mieux, gaspiller moins et gagner du temps au quotidien.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, t, d, img]) => (
            <article key={n} className="border-t border-line pt-4">
              <p className="text-[10px] tracking-widest text-ink/50">{n}</p>
              <h3 className="mt-2 text-xs font-semibold uppercase tracking-[0.12em]">{t}</h3>
              <p className="mt-2 min-h-12 text-xs leading-relaxed text-ink/70">{d}</p>
              <img src={`/img/${img}.jpg`} alt="" loading="lazy" className="mt-4 aspect-[3/4] w-full rounded-2xl object-cover" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function Bottom() {
  return (
    <>
      <section className="border-y border-line">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-14 sm:px-12 md:grid-cols-[1fr_2fr] md:items-center">
          <h2 className="font-display text-4xl font-light uppercase leading-tight">Bien plus<br />qu&apos;une app<br />de recettes.</h2>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[["7", "repas planifiés chaque semaine"], ["2", "sources de recettes au choix"], ["1 clic", "pour la liste de courses"], ["Lun→Dim", "calendrier modulable"]].map(([v, l]) => (
              <div key={l}><dt className="font-display text-4xl font-light">{v}</dt><dd className="mt-1 text-xs text-ink/70">{l}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 border-b border-line p-8 sm:p-12 md:border-b-0 md:border-r">
          <p className="font-display text-3xl font-light uppercase leading-snug">« Moins de temps à décider, plus de temps à cuisiner. »</p>
          <p className="text-xs uppercase tracking-[0.18em] text-ink/60">L&apos;idée derrière Repas Malin</p>
        </div>
        <img src="/img/burger.jpg" alt="Burgers maison au basilic" loading="lazy" className="h-72 w-full object-cover md:h-full" />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-14 sm:px-12 md:flex-row md:items-center">
          <h2 className="font-display text-4xl font-light uppercase leading-tight">Prêt à transformer<br />vos repas du quotidien ?</h2>
          <a href="#planner" className={pill}>Planifier ma semaine</a>
        </div>
      </section>

      <footer id="apropos" className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 py-10 text-xs sm:px-12 md:grid-cols-3">
          <Logo />
          <p className="text-ink/60">Les recettes fournies sont des exemples de démonstration. Ajoutez les vôtres depuis « Mes recettes ».</p>
          <p className="text-ink/60 md:text-right">© {new Date().getFullYear()} Repas Malin</p>
        </div>
      </footer>
    </>
  );
}
