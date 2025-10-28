export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10 py-10 text-sm text-muted">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Julian Nicácio. Built with Next.js. Deployed on Vercel.
          </div>
          <nav className="flex items-center gap-4">
            <a href="/cv.pdf" download className="hover:underline">CV</a>
            <a href="https://github.com/juliannicb" target="_blank" className="hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/juliannic" target="_blank" className="hover:underline">LinkedIn</a>
            <a href="mailto:jngbrandalise@live.com" className="hover:underline">Email</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}