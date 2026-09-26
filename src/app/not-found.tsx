import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-24">
      <p className="label">404</p>
      <h1 className="mt-2 font-heading font-semibold text-[36px] text-fg">There is nothing at this address.</h1>
      <p className="mt-4 max-w-[50ch] text-[16px] leading-relaxed text-fg-muted">
        The page may have moved when I rebuilt the site. The blog and notes are still here.
      </p>
      <p className="mt-6 flex flex-wrap gap-x-5 text-[15px]">
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/blog" className="link">
          Blog
        </Link>
        <Link href="/notes" className="link">
          Notes
        </Link>
      </p>
    </section>
  );
}
