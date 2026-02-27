export default function ContactPage() {
  const contacts = [
    { label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
    { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername" },
    { label: "Twitter", value: "@yourusername", href: "https://twitter.com/yourusername" },
  ];

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="font-mono text-lg text-accent mb-6">Contact</h1>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.label} className="border border-border p-4 bg-card">
            <span className="font-mono text-sm text-text-secondary block mb-1">
              {contact.label}
            </span>
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-text transition-colors duration-200 font-mono text-sm"
            >
              {contact.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
