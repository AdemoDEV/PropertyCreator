export function Input({ className = '', ...props }) {
  return (
    <input className={`border border-gray-300 rounded-xl px-3 py-2 w-full ${className}`} {...props} />
  );
}
