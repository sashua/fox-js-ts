export async function fetchCountries() {
  let fetchedCountries = [];
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?" +
        new URLSearchParams({ fields: "name,flags,region,capital,population" })
    );
    if (!response.ok) {
      throw new Error(
        `Server response is not OK: ${response.status} ${response.statusText}`
      );
    }
    fetchedCountries = await response.json();
  } catch (err) {
    console.log(err);
  } finally {
    return fetchedCountries
      .map(({ name, flags, region, capital, population }) => ({
        name: name.common,
        flag: flags.svg,
        region,
        capital,
        population,
      }))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  }
}

export function getRegions(countries) {
  const regions = [...new Set(countries.map(({ region }) => region))];
  return regions.sort((a, b) => (a > b ? 1 : -1));
}

export function filterCountries(countries, { query, region }) {
  const queryVal = query?.trim().toLowerCase();
  const regionVal = region?.toLowerCase();
  return countries.filter(
    ({ name, region }) =>
      (queryVal ? name.toLowerCase().includes(queryVal) : true) &&
      (regionVal ? region.toLowerCase() === regionVal : true)
  );
}
