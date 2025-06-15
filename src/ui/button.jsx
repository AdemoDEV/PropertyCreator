export function Button({ children, className = '', ...props }) {
  return (
    <button className={`bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-2xl shadow ${className}`} {...props}>
      {children}
    </button>
  );
}
