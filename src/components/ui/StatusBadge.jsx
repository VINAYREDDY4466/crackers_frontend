import { badgeClass, statusLabel } from '../../utils/labels';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(status)}`}>
      {statusLabel(status)}
    </span>
  );
}
