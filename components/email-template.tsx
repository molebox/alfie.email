
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import ReactHtmlParser, { convertNodeToElement, Transform } from 'react-html-parser';
import { A, Blockquote, Code, Div, H1, H2, H3, H4, H5, H6, Li, P, Pre, Span, Ul } from '@/lib/email-components';

interface EmailTemplateProps {
  content: string;
}

const componentMappingWithHref = {
  a: A,
} as const;

const componentMapping = {
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

const transform: Transform = (node, index) => {
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

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  content,
}) => {
  return (
    <Tailwind>
      <Html>
        {ReactHtmlParser(content, { transform })}
      </Html>
    </Tailwind>
  )
};

export default EmailTemplate;
