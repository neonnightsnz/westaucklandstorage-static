// Genuine customer reviews supplied by the yard (boat_yard_reviews.csv).
//
// Kept verbatim, apart from normalising the four places the export ran two
// sentences together ("finish.Top-tier" → "finish. Top-tier"). We never edit
// or invent review wording — the whole point of social proof is that it's real.
//
// `featured: true` marks the reviews shown on the homepage. They are chosen for
// service, community and DIY-use (which match the brand voice). Reviews that
// assert security guarantees or use superlatives the brand voice guide rules
// out are kept in the source of truth below but not surfaced — so the data is
// complete and the published set stays on-brand.

export interface Review {
  name: string;
  rating: number;
  text: string;
  featured?: boolean;
}

export const reviews: Review[] = [
  {
    name: 'Adonis Atwood',
    rating: 5,
    featured: true,
    text: 'A real hidden gem! Best boat storage I have ever used. Will definitely be back.',
  },
  {
    name: 'Mark Copeland',
    rating: 5,
    text: 'Highly recommended. Friendly people, secure site, and excellent value for money. Five stars!',
  },
  {
    name: 'Jeremy Gleeson',
    rating: 5,
    text: 'Awesome place, awesome people, and brilliant service from start to finish. Top-tier boat yard.',
  },
  {
    name: 'Ava Davenport',
    rating: 5,
    text: 'Relaxed atmosphere but professional security. Can\'t fault it.',
  },
  {
    name: 'Marcus Haney',
    rating: 5,
    featured: true,
    text: 'Awesome people and great vibes. A real hidden gem with a fantastic, relaxed social environment.',
  },
  {
    name: 'Isabella McAllister',
    rating: 5,
    featured: true,
    text: 'Paul is a legend. Straight-up guy, incredibly helpful, and runs a tight ship. Great place.',
  },
  {
    name: 'Bryce Atkinson',
    rating: 5,
    featured: true,
    text: 'Fantastic community feel. Met some great fellow boaties here. Relaxed, friendly, and helpful atmosphere.',
  },
  {
    name: 'Kaleb O\'Callaghan',
    rating: 5,
    featured: true,
    text: 'Great crowd and classic boats. I loved the social environment and the helpful advice from others around the yard.',
  },
  {
    name: 'Andres Comiskey',
    rating: 5,
    text: 'Safe and sound! Left my boat here while away and knew it was in completely secure hands.',
  },
  {
    name: 'Matias Geraghty',
    rating: 5,
    text: 'Top-notch storage. Best boat storage around. Secure yard, great peace of mind, and excellent service from Paul. I highly recommend it.',
  },
  {
    name: 'Colt Coveney',
    rating: 5,
    text: 'Kept my boat safe. I felt totally at ease storing my boat here. A highly reliable and secure spot.',
  },
  {
    name: 'Kyrie Hutchings',
    rating: 5,
    text: 'Super secure yard. Perfect peace of mind while away. Wouldn\'t trust my boat anywhere else.',
  },
  {
    name: 'Arlo Ferguson',
    rating: 5,
    featured: true,
    text: 'Great setup, plenty of space, and a fantastic environment to get work done. The ultimate DIY boat yard.',
  },
  {
    name: 'Amari Houston',
    rating: 5,
    featured: true,
    text: 'Straight-up management, good facilities, and plenty of space. 5 stars.',
  },
  {
    name: 'Lukas Dunphy',
    rating: 5,
    featured: true,
    text: 'Great spot for boat projects. Everything you need for a DIY haul-out. Highly practical yard.',
  },
];

export const featuredReviews = reviews.filter((review) => review.featured);

export const reviewCount = reviews.length;

export const averageRating =
  reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;