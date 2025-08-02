

export function Table({ children, className = "", ...props }) {
  return (
    <table className={`table-auto ${className}`} {...props}>
      {children}
    </table>
  );
}

export function TableBody({ children, className = "", ...props }) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`p-3 ${className}`} {...props}>
      {children}
    </td>
  );
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <th className={`p-3 text-left ${className}`} {...props}>
      {children}
    </th>
  );
}
