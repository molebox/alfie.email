interface EmailTemplateProps {
  firstName: string;
  product: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  product,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Thanks for trying {product}. Were thrilled to have you on board.</p>
  </div>
);

export default EmailTemplate;
