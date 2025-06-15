export function Select({ children, value, onValueChange }) {
  return (
    <select value={value} onChange={e => onValueChange(e.target.value)} className="border border-gray-300 rounded-xl px-3 py-2 w-full">
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <>{placeholder}</>;
export const SelectContent = ({ children }) => <>{children}</>;
