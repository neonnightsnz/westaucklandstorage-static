// Storage near <suburb> pages.
//
// These are the Stage 12 "Locations" playbook at a deliberately small scale.
// Each entry adds what the suburb itself needs to know: a heading carrying the
// search term, at least two sections of local detail, and a bullet list of
// items people actually store from that area. It does not repeat a suburb
// guide, and it does not restate what we store.
//
// Every suburb with a published guide in src/data/locations.ts gets one page
// here, and src/data/blog.ts expects the same set of slugs. Adding a guide
// without a page, or a page without a guide, fails the build in check-site.mjs.

import { guidedSuburbs } from './locations.ts';

export interface LocationPage {
  /**
   * The public route, always `/storage-near/<guideSlug>/`.
   *
   * The route has two segments: the static `storage-near` directory in
   * src/pages/storage-near/[slug].astro, and the guide slug as the param. The
   * full path is assembled here once so links, the sitemap and the route cannot
   * disagree about where a suburb's page lives.
   */
  slug: string;
  /** The suburb name, used in copy and in structured data. */
  suburb: string;
  /** A covering suburb name only where the place is not a suburb. */
  locality: string;
  /** The slug of this suburb's published guide in src/data/blog.ts. */
  guideSlug: string;
  /** Sentence-case heading; the layout uppercases it, so write it plainly. */
  title: string;
  /** The search-facing description, also the meta description's opening. */
  description: string;
  /** Bullets shown in the page aside. Local items first, never a second list of what we store. */
  bullets: string[];
  sections: { heading: string; paragraphs: string[] }[];
}

// Keyed by the suburb name used in src/data/locations.ts, so a renamed suburb
// fails loudly here rather than silently shipping the wrong heading.
const profileBySuburb: Record<string, { locality?: string; note?: string; bullets: string[]; sections: LocationPage['sections'] }> = {
  Glendene: {
    note: 'The yard is on your doorstep.',
    bullets: [
      'The shortest trip of any suburb we serve',
      'Boats, caravans and spare vehicles kept off tight driveways',
      'New Lynn and Kelston addresses are one turn from the gate',
    ],
    sections: [
      {
        heading: 'You cannot store closer to home than this',
        paragraphs: [
          'The yard is at 20 Akatea Road, in Glendene itself, so storing here means a walk or a two-minute drive rather than a tow across the city. Owners drop in to check a cover, work on a boat with the site manager\'s pre-approval, or hook up and leave.',
          'That changes how often you actually use the thing. When the boat or caravan sits behind the house, washing it down is a job. When it sits down the road on a spot of its own, it stops competing with the driveway, the garage and the street.',
        ],
      },
      {
        heading: 'What Glendene driveways run out of room for',
        paragraphs: [
          'Glendene is a suburb of standard quarter-acre sections and family homes, and most of those sections already hold two cars, a trailer and a set of bins. Adding a caravan or a launch leaves nowhere to turn a vehicle around.',
          'Keeping the stored item at the yard gives that turning space back, and keeps the boat or caravan level and easy to hitch on rather than parked nose-in on a slope.',
        ],
      },
    ],
  },
  Kelston: {
    note: 'Right next door, off Great North Road.',
    bullets: [
      'Minutes from the yard along Great North Road',
      'Off-street space that busy Kelston roads do not allow',
      'Trailers and spare vehicles out of the kerbside squeeze',
    ],
    sections: [
      {
        heading: 'Close enough to fetch after work',
        paragraphs: [
          'Kelston shares a boundary with Glendene, and the yard is a short run along Great North Road from almost anywhere in the suburb. That makes an evening visit practical, whether you are checking a battery, rinsing salt off a trailer or loading up the night before a trip.',
          'It is also the reason Kelston owners tend to keep a caravan or trailer here the whole season rather than shifting it back to the driveway between trips.',
        ],
      },
      {
        heading: 'The kerbside is not a storage spot',
        paragraphs: [
          'Kelston mixes family homes, small businesses and a lot of through traffic. Kerbside and verge parking fills quickly, and a trailer left on the street for weeks is both in the way and in the weather.',
          'A hardstand spot at the yard keeps the trailer off the road, on level ground, with room to walk around it when you need to check bearings or lights.',
        ],
      },
    ],
  },
  'New Lynn': {
    note: 'A short run down Great North Road.',
    bullets: [
      'Townhouses and units with a single parking space',
      'Boats and trailers kept off shared carparks',
      'Easy access from the Great North Road corridor',
    ],
    sections: [
      {
        heading: 'Built-up streets leave little room for a boat',
        paragraphs: [
          'New Lynn has changed quickly. More townhouses, more units, more shared driveways, and each of them with one parking space per household or fewer. A boat, caravan or second vehicle simply cannot live there.',
          'At the yard, each item gets its own hardstand spot a few minutes from home, so it stays local without taking the space you need for the car you drive every day.',
        ],
      },
      {
        heading: 'Practical for a Friday getaway',
        paragraphs: [
          'The run from New Lynn to the yard is short and mostly straight, which matters when you are towing. Hook up, head out, and you are clear of the town centre traffic within minutes.',
          'Owners who use the yard for a caravan or campervan usually tell us their departure day before they book, so access can be arranged around an early start.',
        ],
      },
    ],
  },
  'Green Bay': {
    note: 'Just south of the yard, up the hill.',
    bullets: [
      'Steep sections that make hitching a boat awkward at home',
      'Level hardstand instead of a sloped driveway',
      'Close enough to check the cover before a trip',
    ],
    sections: [
      {
        heading: 'Steep sections make home storage hard work',
        paragraphs: [
          'Green Bay climbs up from the Manukau Harbour, and plenty of sections arrive with a driveway that is really a ramp. Hitching a trailer on a slope, or turning a boat around on one, is the part of ownership most owners would rather skip.',
          'The yard is flat. You drive in, back the trailer on, and drive out without the gradient working against you.',
        ],
      },
      {
        heading: 'Harbour access without harbour prices',
        paragraphs: [
          'Living close to the water is why a lot of Green Bay households own a boat in the first place. Storing it here keeps that boat near the harbour without a marina berth and the monthly cost that comes with one.',
          'Note that the yard slipway is currently under repair and haul-out remains a work in progress, so call before you plan a launch or haul-out around it.',
        ],
      },
    ],
  },
  Sunnyvale: {
    note: 'A few minutes south of Glendene.',
    bullets: [
      'One driveway doing too many jobs',
      'Caravans and trailers stored level and ready to hook on',
      'Family sections kept free for the everyday cars',
    ],
    sections: [
      {
        heading: 'A family driveway only holds so much',
        paragraphs: [
          'Sunnyvale is settled, family-heavy suburbia, and the driveway already carries two cars, a bike or two and whatever the week has brought home. A caravan or trailer parked on it is one thing too many.',
          'Owners here tend to store the item they use least: the caravan between trips, the trailer between jobs, the boat over winter. The space at home goes back to the cars.',
        ],
      },
      {
        heading: 'Ready when the season turns',
        paragraphs: [
          'Storage is monthly and flexible, so a Sunnyvale household can book a spot for a season, a winter or a year without renegotiating anything.',
          'Bring us the length including the trailer and the date you want to start, and we will confirm what is available.',
        ],
      },
    ],
  },
  Henderson: {
    note: 'Up the north-western motorway.',
    bullets: [
      'Work vehicles, utes and trailers kept off residential streets',
      'A base for tradespeople working across the west',
      'Space for the boat or caravan a Henderson section will not take',
    ],
    sections: [
      {
        heading: 'The west\'s biggest centre, with the tightest parking',
        paragraphs: [
          'Henderson has the shops, the services and the busiest roads in West Auckland, and the streets around them fill up early. A boat, trailer or work vehicle parked on the street is a problem waiting for a complaint.',
          'Tradespeople and small businesses around Henderson use the yard as a base: work vehicles, trailers and equipment stored in one place, with after-hours gate-code access and 24/7 access by prior arrangement.',
        ],
      },
      {
        heading: 'Two ways to reach us',
        paragraphs: [
          'From the Lincoln Road side of Henderson the run is short and direct. From the north it is the motorway south and off at Glendene.',
          'If your vehicle is awkward to tow or drive, tell us when you enquire. Truck storage depends on available space and access, and Jeff will confirm whether your vehicle fits before you drive over.',
        ],
      },
    ],
  },
  Titirangi: {
    note: 'Out towards the Waitakere Ranges.',
    bullets: [
      'Bush-clad sections with narrow, winding driveways',
      'Level storage instead of parking on a slope',
      'Close enough for a bush-to-harbour weekend',
    ],
    sections: [
      {
        heading: 'The hills are the point, and the problem',
        paragraphs: [
          'Titirangi\'s sections are bush, birdsong and a driveway that disappears upward between the trees. Wonderful to live on, and miserable to reverse a trailer down.',
          'Storing the boat or caravan on flat hardstand at the yard takes the hill out of the equation. Drive down, hitch on, and the only slope you deal with is the one on the way to the water.',
        ],
      },
      {
        heading: 'A boat kept where the weather reaches it',
        paragraphs: [
          'Anything stored with us sits outdoors, under the West Auckland sky. In Titirangi, where the bush holds moisture and the shade is generous, a good cover and a seasonal check of the trailer and fittings go a long way.',
          'Owners who want to work on their boat while it is here can do so with the site manager\'s pre-approval.',
        ],
      },
    ],
  },
  Massey: {
    note: 'A short trip up the motorway.',
    bullets: [
      'Fast-growing streets with more vehicles than visits',
      'Boat, caravan and trailer stored away from the kerb',
      'A short motorway run from the yard',
    ],
    sections: [
      {
        heading: 'New streets, familiar parking problem',
        paragraphs: [
          'Massey has grown faster than its parking. Households that arrived with two cars now have a boat, a trailer and a grown-up child\'s vehicle as well, and none of them fit comfortably.',
          'Storing the seasonal items here keeps the everyday driveway usable. The boat, caravan or trailer stays on its own spot, on level ground, ready to collect in one trip.',
        ],
      },
      {
        heading: 'What Massey owners store here',
        paragraphs: [
          'Boat trailers and launches, caravans and campervans, box trailers, cars and 4WDs kept off the road.',
          'Tell us the length including the trailer and the date you want to start, and Jeff will confirm space.',
        ],
      },
    ],
  },
  'Te Atatu Peninsula': {
    note: 'Across the peninsula and down the motorway.',
    bullets: [
      'Waterfront streets with very little spare parking',
      'Boat stored near the ramp, not on a narrow street',
      'Townhouse and unit sections with no room to spare',
    ],
    sections: [
      {
        heading: 'Waterfront living, without the parking',
        paragraphs: [
          'Te Atatu Peninsula is a boat-owning suburb on a narrow street grid. Between the residents, the visitors and the walkers, kerbside space disappears by mid-morning.',
          'Storing the boat at the yard takes it off the street entirely. It sits on hardstand a short motorway run away, and the street outside your place stays usable.',
        ],
      },
      {
        heading: 'Townhouses and shared carparks',
        paragraphs: [
          'Much of the Peninsula\'s newer housing comes with a single allocated space and a shared access way. A trailer parked across that access is a guaranteed conversation with the neighbours.',
          'A storage spot here gives the boat, caravan or trailer a place of its own, away from the shared driveway.',
        ],
      },
    ],
  },
  Swanson: {
    note: 'Out towards the ranges.',
    bullets: [
      'Where the shed is already full',
      'Trailers and boats stored on level ground',
      'A straightforward run in from the Swanson end',
    ],
    sections: [
      {
        heading: 'A shed is useful, but it fills up',
        paragraphs: [
          'Swanson sections are larger than most, and many arrive with a shed already standing on them. That shed then fills with exactly the things you wanted out of the weather, and the boat or trailer is still outside.',
          'Storage at the yard gives the boat or caravan a level spot of its own. The shed stays for tools and the things you actually need to hand.',
        ],
      },
      {
        heading: 'Similar light, similar weather',
        paragraphs: [
          'Out here the yard and Swanson are close enough that the conditions are much the same, so what you do at home to look after a trailer or boat holds true in storage.',
          'Cover it, rinse it, and check the tyres and bearings before a trip. That routine matters more than the address it is parked at.',
        ],
      },
    ],
  },
  Whenuapai: {
    note: 'North-west of the yard.',
    bullets: [
      'Larger sections that still run out of level space',
      'Work vehicles and trailers stored off the road',
      'A base between the airfield and the upper harbour',
    ],
    sections: [
      {
        heading: 'Larger sections are not always level sections',
        paragraphs: [
          'Whenuapai has a real mix of older, roomy sections and new development, and plenty of those parcels slope away from the road. A boat or caravan parked on one sits on a gradient, which is awkward for washing, hitching and working on.',
          'The yard offers flat hardstand instead. Level ground, room to walk around the trailer, and no risk of the boat drifting across a slope while you work on it.',
        ],
      },
      {
        heading: 'Work vehicles kept off the roadside',
        paragraphs: [
          'Tradespeople around Whenuapai often run a ute, a trailer and a second vehicle between jobs. Parking all of that on the verge is not a long-term plan.',
          'Tell Jeff what the vehicles are, how long they are and how often you need to reach them. After-hours gate-code access is available, and 24/7 access can be arranged beforehand.',
        ],
      },
    ],
  },
  'Glen Eden': {
    note: 'A short drive from the yard.',
    bullets: [
      'Older homes with tight, narrow driveways',
      'Caravan and boat stored level, off the street',
      'Space that a Glen Eden section will not spare',
    ],
    sections: [
      {
        heading: 'Older sections, narrower driveways',
        paragraphs: [
          'Glen Eden was laid out when a car was wide and a driveway was a luxury. Add a modern vehicle and a caravan, and there is no room left for manoeuvring.',
          'A storage spot at the yard means the caravan or boat does not have to be reverse-parked into a narrow driveway at all. It waits on flat ground a few minutes away, and you bring it home when you actually need it.',
        ],
      },
      {
        heading: 'The town centre is no place to park a trailer',
        paragraphs: [
          'Glen Eden\'s shops and station draw steady traffic, and the streets around them run out of parking early. Leaving a trailer or second vehicle on one of those streets is not a workable answer.',
          'Use the yard instead. Off the road, off the driveway, and close enough to walk past on your way home.',
        ],
      },
    ],
  },
  'West Harbour': {
    bullets: [
      'Marina-side living with very little spare ground',
      'Boat kept nearby without a marina berth',
      'A short run down to Glendene',
    ],
    sections: [
      {
        heading: 'Beside the marina, without the marina berth',
        paragraphs: [
          'West Harbour sits right on the upper harbour, and a lot of the housing there is tightly laid out townhouses and units with a single parking space. A berth costs what a berth costs, and a driveway that holds one car will not hold a boat as well.',
          'Hardstand storage at the yard is the middle option: the boat stays close to the water, on its own spot, at a monthly rate set for outdoor storage rather than a marina.',
        ],
      },
      {
        heading: 'Getting the boat ready at the yard',
        paragraphs: [
          'Owners can work on their boats here with the site manager\'s pre-approval, and a hose is available for washing down boats and trailers. Toilets are on site.',
          'Tell Jeff the boat\'s length including the trailer and the date you want to start, and he will confirm what is free.',
        ],
      },
    ],
  },
  Hobsonville: {
    bullets: [
      'New townhouses with a shared or single carpark',
      'Boat or caravan kept off the shared access way',
      'An easy drive down the north-western motorway',
    ],
    sections: [
      {
        heading: 'New housing, no spare ground',
        paragraphs: [
          'Most of Hobsonville\'s newer housing arrives with a small yard and one allocated space, and the access ways between the buildings are shared with the neighbours. That is not somewhere a trailer can sit for a season.',
          'Storing here keeps the boat, caravan or trailer out of the shared space entirely, on its own hardstand spot a short motorway run away.',
        ],
      },
      {
        heading: 'One trip in, one trip out',
        paragraphs: [
          'For Hobsonville owners the yard is usually a single straightforward drive, so collecting the boat for a Saturday on the harbour does not eat the morning.',
          'Short stays, winter storage and longer arrangements are all welcome, billed monthly from $200 + GST with no deposit.',
        ],
      },
    ],
  },
  Lincoln: {
    note: 'Between Henderson and the yard.',
    bullets: [
      'Lincoln Road addresses with nowhere off-street to park',
      'A short run from the busy Henderson end',
      'Boats, caravans and work vehicles kept off the road',
    ],
    sections: [
      {
        heading: 'The Lincoln Road end of Henderson never stops',
        paragraphs: [
          'Lincoln is a working end of Henderson: the road carries a steady stream of traffic, and the residential streets running off it fill up early. Long-term kerbside parking is not realistic for a trailer or a second vehicle.',
          'The yard is a short, direct run from the Lincoln Road area, so the boat or caravan stays on level hardstand instead of occupying the street.',
        ],
      },
      {
        heading: 'A base for work vehicles',
        paragraphs: [
          'Tradespeople working out of this end of Henderson often run a ute, a trailer and a project vehicle at once. Storing the ones not in daily use at the yard frees up the space outside the house.',
          'After-hours access uses a gate code, and 24/7 access can be arranged beforehand if your work starts early.',
        ],
      },
    ],
  },
  'Herald Island': {
    note: 'Out on the upper harbour.',
    bullets: [
      'Island sections with limited off-street space',
      'Boat stored close by between fishing days',
      'Trailer kept off a narrow island road',
    ],
    sections: [
      {
        heading: 'An island where everyone owns a boat',
        paragraphs: [
          'Herald Island is a small waterfront community, and boat ownership there is not a hobby, it is the point. The catch is that the island itself has finite room between the road, the water and the houses.',
          'Storing a boat here keeps it within a short drive of home and off the island\'s narrow roads between trips.',
        ],
      },
      {
        heading: 'Reach the boat in one run',
        paragraphs: [
          'The trip from Herald Island to the yard is one straightforward drive, which matters when half your day is already spent on the water.',
          'Come and see the space before you commit, or call Jeff with the boat\'s length including the trailer and your start date.',
        ],
      },
    ],
  },
  'Te Atatu South': {
    note: 'Just south of the peninsula.',
    bullets: [
      'Handy for the motorway and the harbour',
      'Boats and trailers off residential streets',
      'Stored level, ready to tow',
    ],
    sections: [
      {
        heading: 'Well placed for towing, tight on parking',
        paragraphs: [
          'Te Atatu South sits between the motorway and the harbour, which makes it a practical base for anyone who tows regularly. It is also dense residential, and the streets show it.',
          'Store the boat or trailer here and you keep the convenience of the location without parking the whole operation on the street outside.',
        ],
      },
      {
        heading: 'For owners who use their boat often',
        paragraphs: [
          'Owners who launch regularly tend to value proximity over everything else. The run to the yard is short, the access is straightforward, and the boat is on level ground rather than wedged beside a fence.',
          'Give Jeff your length including the trailer and start date, and tell him how often you expect to collect it.',
        ],
      },
    ],
  },
  'Western Heights': {
    note: 'On the edge of the Waitakere Ranges.',
    bullets: [
      'Sloped sections and steep access',
      'Level hardstand instead of a gradient',
      'A short run down to the yard',
    ],
    sections: [
      {
        heading: 'Ridgeline sections come with a gradient',
        paragraphs: [
          'Western Heights looks out across the harbour from above Henderson and Te Atatu, and the sections that give you that view also give you a slope. Hitching a trailer on one is a two-person job at best.',
          'Storing here swaps the slope for flat hardstand, which is the difference between a quick departure and a wrestling match on the weekend.',
        ],
      },
      {
        heading: 'Boat and caravan stored together',
        paragraphs: [
          'Many Western Heights households keep both the boat and the caravan, which is more than any driveway can hold comfortably.',
          'Store one, or both. Tell us the length of each and the start date, and we will work out which spots will take them.',
        ],
      },
    ],
  },
  Huia: {
    note: 'Further out along the Manukau.',
    bullets: [
      'Tidy but tight sections at the road end',
      'Boat and trailer stored rather than parked up',
      'Close enough to collect at short notice',
    ],
    sections: [
      {
        heading: 'Tight sections at the end of the road',
        paragraphs: [
          'Huia is small, and the properties there are well kept but limited in off-street space. A boat or trailer that spends most of its life parked is taking up the space you would rather use for something else.',
          'Storing it at the yard keeps the section clear and the boat looked after, with the added benefit that it is on level ground when you come to hook up.',
        ],
      },
      {
        heading: 'Worth the drive in',
        paragraphs: [
          'It is a longer trip to the yard from Huia than from anywhere else on our list, so owners here usually plan around longer stays: booked for a season, collected for the good weather, returned at the end of it.',
          'Monthly invoicing suits that pattern. Call and we will check what is free.',
        ],
      },
    ],
  },
  Laingholm: {
    note: 'On the Manukau Harbour side.',
    bullets: [
      'Harbour-side sections with narrow driveways',
      'Harbour boats stored close to home',
      'Trailers kept off the road',
    ],
    sections: [
      {
        heading: 'Harbour-side sections, narrow entrances',
        paragraphs: [
          'Laingholm sits on the harbour side of the Waitakere Ranges, where sections step down to the water and the driveways are narrow by necessity. Turning a boat and trailer around at the bottom of one is not fun.',
          'The yard is flat, open and easy to move in and out of. That is most of the reason Laingholm owners store with us rather than shuffling the boat around at home.',
        ],
      },
      {
        heading: 'Between harbour days',
        paragraphs: [
          'Storage is flexible, so Laingholm owners can book a spot for a few weeks, a full season or the long term, and pay monthly either way.',
          'The slipway at the yard is currently under repair and haul-out is still a work in progress, so check with us before lining up a launch around either.',
        ],
      },
    ],
  },
};

/** Guard: a guided suburb with no profile here would ship a half-built page. */
const missingProfiles = guidedSuburbs.filter((suburb) => !profileBySuburb[suburb.name]);
if (missingProfiles.length) {
  throw new Error(`Storage-near pages missing for: ${missingProfiles.map((suburb) => suburb.name).join(', ')}`);
}

/**
 * The public route for a guide slug: /storage-near/<guideSlug>/.
 *
 * The `/storage-near/` part is a static directory in
 * src/pages/storage-near/[slug].astro, and the guide slug is the param, so this
 * concatenates the two. Guide slugs have two shapes (most begin
 * "west-auckland-storage", the Titirangi and Swanson guides do not) and the
 * suburb name never appears in them, which is why every page carries `suburb`
 * and `guideSlug` explicitly rather than deriving one from the other.
 */
export const routeFor = (guideSlug: string): string =>
  `/storage-near/${guideSlug.replace(/^storage-near-/, '')}/`;

export const locationPages: LocationPage[] = guidedSuburbs.map((suburb) => {
  const profile = profileBySuburb[suburb.name];
  const locality = profile.locality ?? suburb.name;
  return {
    slug: routeFor(suburb.slug),
    suburb: suburb.name,
    locality,
    guideSlug: suburb.slug,
    title: `Outdoor storage for ${suburb.name}`,
    description: `Boat, caravan and vehicle storage for ${suburb.name} owners at our Glendene yard, from $200 + GST a month. Tell Jeff the length including the trailer and your start date.`,
    bullets: profile.bullets,
    sections: [
      ...profile.sections,
      {
        heading: 'What owners store here',
        paragraphs: [
          'Boats on trailers up to 40ft, caravans and campervans, box and boat trailers, cars, 4WDs, utes, work vehicles, shipping containers, jet skis and kayaks.',
          'Give us the length including the trailer, and the date you would like to start. Storage is billed monthly from $200 + GST, and there is no deposit and no waitlist.',
        ],
      },
    ],
  };
});

/** Every location page route, for the sitemap. */
export const locationSlugs = locationPages.map((page) => page.slug);