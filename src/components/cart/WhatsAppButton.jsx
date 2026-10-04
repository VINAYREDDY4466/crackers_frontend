import Button from '../ui/Button';

export default function WhatsAppButton({ onClick, disabled, loading, label = 'Order via WhatsApp' }) {
  return (
    <Button onClick={onClick} disabled={disabled || loading} size="lg" className="w-full">
      {loading ? 'Preparing WhatsApp…' : label}
    </Button>
  );
}
