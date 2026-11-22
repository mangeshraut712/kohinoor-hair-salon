import { HOURS_SCHEDULE, SALON_INFO } from '@/data/salon';

export function ReviewsAndHours() {
  const { google } = SALON_INFO;
  return (
    <section id="reviews-hours" aria-labelledby="reviews-title" className="border-b border-rule bg-cream">
      <div className="mx-auto grid [&>*]:min-w-0 max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">Google Reviews</p>
          <h2 id="reviews-title" className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">
            Rated by the neighbourhood
          </h2>
          <p className="tabular mt-6 text-5xl font-bold text-oxblood">{google.rating.toFixed(1)} / 5</p>
          <p className="tabular mt-1 text-sm text-muted">from {google.reviewCount} Google reviews</p>
          <a
            href={google.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line mt-6"
          >
            Read reviews on Google
          </a>
          {SALON_INFO.reviewQuotes ? (
            <ul className="mt-6 space-y-3">
              {SALON_INFO.reviewQuotes.map((q) => (
                <li key={q} className="border-l-2 border-oxblood pl-3">
                  {q}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <p className="eyebrow">Opening Hours</p>
          <h2 className="mt-2 text-3xl font-bold text-oxblood md:text-4xl">Hours by day</h2>
          <table className="tabular mt-6 w-full border-collapse text-sm">
            <caption className="sr-only">Opening hours by day</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Hours</th>
              </tr>
            </thead>
            <tbody>
              {HOURS_SCHEDULE.map((r) => (
                <tr key={r.day} className="border-b border-rule">
                  <th scope="row" className="py-2 pr-4 text-left font-semibold">
                    {r.day}
                  </th>
                  <td className="py-2 text-right">{r.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm text-muted">
            Monday hours are as listed on Google. Please verify the afternoon schedule with the shop.
          </p>
        </div>
      </div>
    </section>
  );
}
