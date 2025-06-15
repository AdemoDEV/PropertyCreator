export function Checkbox({ checked, onCheckedChange, className = '', ...props }) {
  return (
    <input
      type="checkbox"
      className={`w-5 h-5 text-pink-600 rounded ${className}`}
      checked={checked}
      onChange={e => onCheckedChange(e.target.checked)}
      {...props}
    />
  );
}
