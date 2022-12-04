export function countryTemplate({ name, flag, region, capital, population }) {
  return `
    <li class="country">
      <div class="country__flag-wrap">
        <img
          class="country__flag"
          src="${flag}"
          alt="${name} flag"
        />
      </div>
      <div class="country__info">
        <h2 class="country__name">${name}</h2>
        <p class="country__prop">
          Population: <span class="country__value">${population.toLocaleString()}</span>
        </p>
        <p class="country__prop">
          Region: <span class="country__value">${region}</span>
        </p>
        <p class="country__prop">
          Capital: <span class="country__value">${capital}</span>
        </p>
      </div>
    </li>
  `;
}
