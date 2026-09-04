import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-fg-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="label">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
