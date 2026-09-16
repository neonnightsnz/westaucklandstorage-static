// West Auckland suburbs with a published local guide, grouped by area for the
// /storage-near-you/ hub. A `slug` of null means we serve the area but have no
// dedicated guide yet — it is listed, but not linked.
export const locationGroups = [
  {
    area: 'Around the yard',
    blurb: 'The suburbs closest to Span Farm Boat Yard in Glendene.',
    suburbs: [
      { name: 'Glendene', slug: 'west-auckland-storage-your-premier-storage-solution-in-glendene', note: 'Our home suburb — the yard is right here.' },
      { name: 'Kelston', slug: 'west-auckland-storage-your-reliable-storage-solution-in-kelston', note: 'Next door to the yard.' },
      { name: 'New Lynn', slug: 'west-auckland-storage-your-storage-solution-in-new-lynn', note: 'A short run down Great North Road.' },
      { name: 'Green Bay', slug: 'west-auckland-storage-your-trusted-storage-solution-in-green-bay', note: 'Just south of the yard.' },
      { name: 'Sunnyvale', slug: 'west-auckland-storage-secure-storage-in-sunnyvale', note: 'A few minutes south of Glendene.' },
    ],
  },
  {
    area: 'Henderson & the north-west',
    blurb: 'Up the north-western motorway and out towards the upper harbour.',
    suburbs: [
      { name: 'Henderson', slug: null, note: 'West Auckland’s biggest centre — ask us about space.' },
      { name: 'Lincoln', slug: 'west-auckland-storage-reliable-storage-in-lincoln', note: 'Between Henderson and the yard.' },
      { name: 'Massey', slug: 'west-auckland-storage-reliable-storage-in-massey', note: 'A short trip up the motorway.' },
      { name: 'Western Heights', slug: 'west-auckland-storage-your-ideal-storage-solution-in-western-heights', note: 'On the edge of the Waitakere Ranges.' },
      { name: 'West Harbour', slug: 'west-auckland-storage-trusted-storage-solutions-in-west-harbour', note: 'Out by the marina.' },
      { name: 'Hobsonville', slug: 'west-auckland-storage-your-storage-solution-in-hobsonville', note: 'Across the upper harbour.' },
      { name: 'Whenuapai', slug: 'west-auckland-storage-your-trusted-storage-solution-in-whenuapai', note: 'North-west of the yard.' },
      { name: 'Herald Island', slug: 'west-auckland-storage-the-perfect-storage-solution-for-herald-island-residents', note: 'Out on the upper harbour.' },
    ],
  },
  {
    area: 'Te Atatu & the peninsula',
    blurb: 'Across the peninsula and the motorway.',
    suburbs: [
      { name: 'Te Atatu Peninsula', slug: 'west-auckland-storage-your-go-to-storage-solution-in-te-atatu-peninsula', note: 'Down the north-western motorway.' },
      { name: 'Te Atatu South', slug: 'west-auckland-storage-the-ideal-choice-for-te-atatu-south-residents', note: 'Just south of the peninsula.' },
    ],
  },
  {
    area: 'The Waitakere foothills',
    blurb: 'Out where the city meets the ranges.',
    suburbs: [
      { name: 'Glen Eden', slug: 'west-auckland-storage-your-trusted-storage-solution-in-glen-eden', note: 'A short drive from the yard.' },
      { name: 'Titirangi', slug: 'discovering-west-auckland-storage-the-perfect-solution-for-titirangi-residents', note: 'Out towards the Waitakeres.' },
      { name: 'Laingholm', slug: 'west-auckland-storage-your-reliable-storage-solution-in-laingholm', note: 'On the Manukau Harbour side.' },
      { name: 'Huia', slug: 'west-auckland-storage-your-trusted-storage-in-huia', note: 'Further out along the Manukau.' },
      { name: 'Swanson', slug: 'west-auckland-storage-your-trusted-storage-solution-in-swanson', note: 'Out towards the ranges.' },
    ],
  },
];

export const locationCount = locationGroups.reduce((total, group) => total + group.suburbs.length, 0);
