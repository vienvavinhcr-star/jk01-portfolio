/*
 * JK/01 — content configuration.
 * Edit titles, descriptions, and URLs here. Keep links starting with https://.
 * Each project is displayed as one large, clickable link on the homepage.
 * Extra links appear as separate buttons below that project's main link.
 */
window.JK_DATA = {
  person: {
    name: "Justin",
    // Optional local photo path, e.g. "./assets/justin.webp". Empty keeps the JK monogram.
    photo: "",
    alias: "JustKing",
    location: "MELBOURNE, AUSTRALIA",
    bio: "A collection of digital products, businesses, experiments and ideas I’ve brought to life.",
    about: "Hey, I'm Justin. I build digital products, experiment with ideas and turn curiosity into things people can actually use. JK/01 is a home for everything I'm working on.",
    github: "https://github.com/vienvavinhcr-star"
  },
  // Array order determines display order.
  projects: [
    {
      id: "signaldesk", number: "01", name: "SignalDesk", group: "tools", graphic: "signal",
      category: "FINTECH / MARKET INTELLIGENCE", status: "Explore SignalDesk",
      summary: "A sharper perspective on the markets.",
      description: "A market intelligence workspace built for deeper research and smarter market exploration.",
      url: "https://signaldesk-vestracapital.pages.dev/"
    },
    {
      id: "lexora", number: "02", name: "Lexora", group: "tools", graphic: "lexora",
      category: "EDUCATION / LANGUAGE LEARNING", status: "Explore Lexora",
      summary: "Words worth remembering.",
      description: "A language-learning experience focused on vocabulary, practice and continuous improvement.",
      url: "https://lexora-pte.pages.dev/"
    },
    {
      id: "tapntrust", number: "03", name: "TapNTrust", group: "ventures", graphic: "tap",
      category: "E-COMMERCE / NFC TECHNOLOGY", status: "Explore TapNTrust",
      summary: "A tap that builds trust.",
      description: "Helping businesses connect with customers through smart NFC-powered review solutions.",
      url: "https://tapntrust.com/"
    },
    {
      id: "hazelnuttunes", number: "04", name: "Hazelnuttunes", group: "ventures", graphic: "hazel",
      category: "DIGITAL SERVICES / ONLINE STORE", status: "Visit Hazelnuttunes Shop",
      summary: "Your digital favourites, made simple.",
      description: "A digital storefront for streaming and online subscription services.",
      url: "https://hazelnuttunes.com/",
      extraLinks: [
        { label: "Our Support 24/7", detail: "Facebook support", url: "https://www.facebook.com/profile.php?id=61576748497882", icon: "↗" },
        { label: "Our Fanpage", detail: "News & community", url: "https://www.facebook.com/profile.php?id=61591800332459", icon: "↗" }
      ]
    }
  ]
};