/*
 * JK/01 — content configuration.
 * Edit titles, descriptions, and URLs here. Keep links starting with https://.
 * Each project is displayed as one large, clickable link on the homepage.
 * Extra links appear as separate buttons below that project's main link.
 */
window.JK_DATA = {
  person: {
    name: "Justin",
    alias: "JustKing",
    location: "MELBOURNE, AUSTRALIA",
    bio: "Independent projects, little experiments and useful things built for the real world.",
    about: "Hey, I'm Justin. I build digital products, experiment with ideas and turn curiosity into things people can actually use. JK/01 is a home for everything I'm working on.",
    github: "https://github.com/vienvavinhcr-star"
  },
  projects: [
    {
      id: "signaldesk", number: "01", name: "SignalDesk", group: "tools", graphic: "signal",
      category: "FINANCE / INTELLIGENCE", status: "EXPLORE PLATFORM",
      summary: "A sharper perspective on the markets.",
      description: "A market intelligence workspace built around research, signals and the information that matters.",
      url: "https://signaldesk-vestracapital.pages.dev/"
    },
    {
      id: "lexora", number: "02", name: "Lexora", group: "tools", graphic: "lexora",
      category: "LANGUAGE / LEARNING", status: "EXPLORE APP",
      summary: "Words worth remembering.",
      description: "A personal space for vocabulary, discovery and smarter English learning.",
      url: "https://lexora-pte.pages.dev/"
    },
    {
      id: "tapntrust", number: "03", name: "TapNTrust", group: "ventures", graphic: "tap",
      category: "NFC / LOCAL BUSINESS", status: "VISIT WEBSITE",
      summary: "A tap that builds trust.",
      description: "NFC Google Review Cards for businesses ready to turn great service into lasting customer connections.",
      url: "https://tapntrust.com/"
    },
    {
      id: "hazelnuttunes", number: "04", name: "Hazelnuttunes", group: "ventures", graphic: "hazel",
      category: "DIGITAL / COMMERCE", status: "VISIT THE SHOP",
      summary: "Your digital favourites, made simple.",
      description: "A digital storefront for subscriptions, everyday tools and the online things you love.",
      url: "https://hazelnuttunes.com/",
      extraLinks: [
        { label: "SUPPORT 24/7", detail: "Facebook support", url: "https://www.facebook.com/profile.php?id=61576748497882", icon: "↗" },
        { label: "OUR FANPAGE", detail: "News & community", url: "https://www.facebook.com/profile.php?id=61591800332459", icon: "↗" }
      ]
    }
  ]
};