const steps = [
  ['Browse', 'Look through categories or the full list. Nothing to sign up for.'],
  ['Add to cart', 'Set a quantity and review the discounted total.'],
  ['WhatsApp', 'Leave your name and address, then send the ready-made message.'],
];

export default function HowItWorks() {
  return (
    <section className="page-wrap py-10">
      <h2 className="font-display text-3xl">Three short steps</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {steps.map(([title, text], index) => (
          <article key={title} className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
            <p className="text-sm font-semibold text-brand-700">0{index + 1}</p>
            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
