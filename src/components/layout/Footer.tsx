import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 text-fg">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-bold text-fg">PAWAAC</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Pilotless Airborne Warning and Aerial Control. The aerial security
            layer for the physical world.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-muted md:items-center">
          {[
            ["Technology", "#technology"],
            ["Vision AI", "#vision-ai"],
            ["Deployments", "#deployments"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-fg">
              {l}
            </a>
          ))}
        </nav>

        <div className="font-mono text-[13px] text-muted md:text-right">
          <p>kshitij@pawaac.com</p>
          <p>+91 76739 43461</p>
          <p className="mt-2">
            15, 9th Main Rd, Jayanagar 3rd Block,
            <br />
            Bengaluru — 560011
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© 2026 Pawaac Drones Pvt Ltd</p>
        <div className="flex gap-3">
          <span className="border border-line px-2 py-1 font-mono text-[10px]">DGCA COMPLIANT</span>
          <span className="border border-line px-2 py-1 font-mono text-[10px]">MeitY RECOGNIZED</span>
        </div>
      </div>
    </footer>
  );
}
