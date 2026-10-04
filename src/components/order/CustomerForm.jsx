export default function CustomerForm({ values, errors, onChange }) {
  const field = (name, label, { multiline, ...inputProps } = {}) => (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={values[name]}
          onChange={(event) => onChange(name, event.target.value)}
          className="rounded-2xl border border-orange-100 px-3 py-2"
          {...inputProps}
        />
      ) : (
        <input
          value={values[name]}
          onChange={(event) => onChange(name, event.target.value)}
          className="min-h-11 rounded-2xl border border-orange-100 px-3"
          {...inputProps}
        />
      )}
      {errors[name] && <span className="text-xs text-red-600">{errors[name]}</span>}
    </label>
  );

  return (
    <div className="grid gap-4">
      {field('name', 'Your name', { autoComplete: 'name', maxLength: 80 })}
      {field('phone', 'Mobile number', { inputMode: 'numeric', autoComplete: 'tel', maxLength: 14, placeholder: '9876543210' })}
      {field('address', 'Delivery address', { multiline: true, maxLength: 300 })}
      {field('notes', 'Notes (optional)', { multiline: true, maxLength: 300 })}
    </div>
  );
}

export function validateCustomer(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) errors.name = 'Enter your name.';
  const phone = values.phone.replace(/\D/g, '').slice(-10);
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (!values.address || values.address.trim().length < 8) errors.address = 'Enter the delivery address.';
  if (values.notes && values.notes.length > 300) errors.notes = 'Keep notes under 300 characters.';
  return errors;
}
