// Company incorporated on 10 January 2008, confirmed by the owner.
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Pacific/Auckland', year: 'numeric', month: '2-digit', day: '2-digit',
}).formatToParts(new Date());
const part = (type: string) => Number(today.find(value => value.type === type)?.value);

export const yearsSinceIncorporation = part('year') - 2008
  - (part('month') === 1 && part('day') < 10 ? 1 : 0);
