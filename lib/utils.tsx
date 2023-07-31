import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { convertNodeToElement, Transform } from 'react-html-parser';
import { A, Blockquote, Code, Div, H1, H2, H3, H4, H5, H6, Li, P, Pre, Span, Ul } from '@/lib/email-components';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncate(text: string, count: number): string {
  return text.length > count ? text.slice(0, count) + "..." : text;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();

  let day;
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    day = "Today";
  } else {
    // This will display the date in the format "Month Day, Year". 
    day = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  let hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const time = hours + ":" + minutes + ampm;
  return `${day}, ${time}`;
}


export const componentMapping = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  span: Span,
  ul: Ul,
  li: Li,
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  div: Div,
} as const;

export const componentMappingWithHref = {
  a: A,
} as const;


export const transform: Transform = (node, index) => {
  if (
    node.type === 'tag' &&
    node.name &&
    node.attribs &&
    Object.hasOwnProperty.call(componentMappingWithHref, node.name)
  ) {
    const Component = componentMappingWithHref[node.name as keyof typeof componentMappingWithHref];
    return (
      <Component key={index} href={node.attribs.href}>
        {node.children?.map((childNode: any, childIndex: any) =>
          convertNodeToElement(childNode, childIndex, transform)
        )}
      </Component>
    );
  } else if (
    node.type === 'tag' &&
    node.name &&
    Object.hasOwnProperty.call(componentMapping, node.name)
  ) {
    const Component = componentMapping[node.name as keyof typeof componentMapping];
    return (
      <Component key={index}>
        {node.children?.map((childNode: any, childIndex: any) =>
          convertNodeToElement(childNode, childIndex, transform)
        )}
      </Component>
    );
  }
};

export const defaultLabelColors = [
  "#fee2e2",
  "#fef9c3",
  "#dcfce7",
  "#ccfbf1",
  "#dbeafe",
  "#ede9fe",
  "#fce7f3",
  "#ffe4e6",
]
