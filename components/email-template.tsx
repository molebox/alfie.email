
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import ReactHtmlParser from 'react-html-parser';
import { transform } from '@/lib/utils'

interface EmailTemplateProps {
  content: string;
}

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
