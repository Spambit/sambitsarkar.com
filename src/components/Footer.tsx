export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Sambit Sarkar. All opinions are my
            own.
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:contact@sambitsarkar.com"
              className="footer-link"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/sambit-sarkar-4835b318/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Spambit/sambitsarkar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
