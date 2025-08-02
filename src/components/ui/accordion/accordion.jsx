export function Accordion({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function AccordionItem({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function AccordionTrigger({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

export function AccordionContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}