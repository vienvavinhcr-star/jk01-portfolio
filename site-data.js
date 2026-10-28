/* JK/01 — edit content here. Array order is display order.
 * Use local logo/photo paths and HTTPS destinations.
 * Facebook links stay outside the shop link, so each opens independently.
 */
window.JK_DATA = {
  person: {
    name: 'Justin',
    location: 'Melbourne, Australia',
    photo: './assets/justin.jpg', // Local profile image.
    github: 'https://github.com/vienvavinhcr-star'
  },
  projects: [
    {
      id: 'signaldesk', name: 'SignalDesk',
      subtitle: 'Market intelligence', logo: './assets/signaldesk.svg',
      url: 'https://signaldesk-vestracapital.pages.dev/'
    },
    {
      id: 'lexora', name: 'Lexora',
      subtitle: 'A little learning, every day', logo: './assets/lexora.svg',
      url: 'https://lexora-pte.pages.dev/'
    },
    {
      id: 'tapntrust', name: 'TapNTrust',
      subtitle: 'One tap. Better connections.', logo: './assets/tapntrust.png',
      url: 'https://tapntrust.com/'
    },
    {
      id: 'hazelnuttunes', name: 'Hazelnuttunes Shop',
      subtitle: 'Your digital favourites', logo: './assets/hazelnuttunes.png',
      url: 'https://hazelnuttunes.com/',
      extraHeading: 'Hazelnuttunes · Support & community',
      extraLinks: [
        { label: 'Our Support 24/7', url: 'https://www.facebook.com/profile.php?id=61576748497882' },
        { label: 'Our Fanpage', url: 'https://www.facebook.com/profile.php?id=61591800332459' }
      ]
    }
  ]
};
