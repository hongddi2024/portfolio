export default function ContactPage() {
  const contacts = [
    {
      label: "Email",
      value: "hongddi2024@gmail.com",
      href: "mailto:hongddi2024@gmail.com",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <rect x="2" y="4" width="20" height="16" />
          <polyline points="2,4 12,13 22,4" />
        </svg>
      ),
    },
    {
      label: "Discord",
      value: "hongddi_",
      href: "https://discord.com/users/hongddi_",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.36-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.02.03.05.03.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
        </svg>
      ),
    },
    {
      label: "X (Twitter)",
      value: "@hongddi_",
      href: "https://x.com/hongddi_",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Bluesky",
      value: "@hongddi.bsky.social",
      href: "https://bsky.app/profile/hongddi.bsky.social",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25c2.92 3.28 6.07 7.7 6.07 10.34 0 2.12-1.67 3.16-3.34 3.16-.93 0-1.8-.4-2.38-1.07a.18.18 0 0 0-.27-.01l-.08.08c-.58.67-1.45 1.07-2.38 1.07-1.67 0-3.34-1.04-3.34-3.16 0-2.64 3.15-7.06 6.07-10.34a.27.27 0 0 1 .32-.07c.05.02.05.02.05.02l.14.07.14-.07zM6.28 17.75c.26.88 1.03 1.48 2.22 1.48 1.87 0 2.81-.97 3.5-1.98.69 1.01 1.63 1.98 3.5 1.98 1.19 0 1.96-.6 2.22-1.48.33.06.63.09.9.09 1.1 0 1.88-.47 1.88-1.34 0-.56-.38-1.12-.88-1.56.46-.45.74-1.01.74-1.6 0-1-.76-1.82-1.82-2.32.13-.52.2-1.07.2-1.62 0-3.5-3.88-8.65-6.74-11.4-.5-.49-1.3-.49-1.8 0C7.34 1.75 3.46 6.9 3.46 10.4c0 .55.07 1.1.2 1.62-1.06.5-1.82 1.32-1.82 2.32 0 .59.28 1.15.74 1.6-.5.44-.88 1-.88 1.56 0 .87.78 1.34 1.88 1.34.27 0 .57-.03.9-.09z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="font-mono text-lg text-accent mb-6">Contact</h1>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.label} className="border border-border p-4 bg-card">
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-accent hover:text-text transition-colors duration-200"
            >
              <span className="shrink-0 text-text-secondary">{contact.icon}</span>
              <div>
                <span className="font-mono text-sm text-text-secondary block mb-1">
                  {contact.label}
                </span>
                <span className="font-mono text-sm">
                  {contact.value}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
