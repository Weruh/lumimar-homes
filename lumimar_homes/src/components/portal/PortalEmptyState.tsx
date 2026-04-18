type PortalEmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: string;
};

export default function PortalEmptyState({
  eyebrow,
  title,
  description,
  icon = 'inventory_2',
}: PortalEmptyStateProps) {
  return (
    <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-ambient md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">{eyebrow}</p>
        <h1 className="mb-4 font-headline text-3xl font-bold text-primary md:text-4xl">{title}</h1>
        <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">{description}</p>
      </div>
    </section>
  );
}
