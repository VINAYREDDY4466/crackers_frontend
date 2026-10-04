const sorts = [
  ['newest', 'Newest'],
  ['price_asc', 'Price: low to high'],
  ['price_desc', 'Price: high to low'],
  ['discount', 'Biggest discount'],
];

export default function ProductFilter({
  categories,
  search,
  onSearch,
  category,
  ageGroup,
  sort,
  offers,
  onChange,
  lockOffers = false,
  lockCategory = false,
}) {
  return (
    <div className="grid gap-3 rounded-3xl bg-white p-4 ring-1 ring-orange-100 md:grid-cols-2 xl:grid-cols-5">
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Search</span>
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Flower pot, rocket..."
          className="min-h-11 rounded-2xl border border-orange-100 px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Category</span>
        <select
          value={category}
          disabled={lockCategory}
          onChange={(event) => onChange({ category: event.target.value, page: 1 })}
          className="min-h-11 rounded-2xl border border-orange-100 px-3 disabled:bg-orange-50"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>{item.name}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Age group</span>
        <select
          value={ageGroup}
          onChange={(event) => onChange({ ageGroup: event.target.value, page: 1 })}
          className="min-h-11 rounded-2xl border border-orange-100 px-3"
        >
          <option value="">Everyone</option>
          <option value="kids">Kids</option>
          <option value="family">Family</option>
          <option value="adults">Adults</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Sort</span>
        <select
          value={sort}
          onChange={(event) => onChange({ sort: event.target.value, page: 1 })}
          className="min-h-11 rounded-2xl border border-orange-100 px-3"
        >
          {sorts.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label className="flex min-h-11 items-center gap-2 self-end text-sm font-medium">
        <input
          type="checkbox"
          checked={offers}
          disabled={lockOffers}
          onChange={(event) => onChange({ offers: event.target.checked, page: 1 })}
        />
        Offers only
      </label>
    </div>
  );
}
