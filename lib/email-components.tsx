import React, { ReactNode } from 'react';

interface HtmlComponentProps {
  children?: ReactNode;
  [key: string]: any; // allows any other prop
};


interface AnchorProps extends HtmlComponentProps {
  href: string;
}

// Headers
const H1: React.FC<HtmlComponentProps> = ({ children }) => <h1 className="text-4xl text-slate-900">{children}</h1>;
const H2: React.FC<HtmlComponentProps> = ({ children }) => <h2 className="text-3xl text-slate-900">{children}</h2>;
const H3: React.FC<HtmlComponentProps> = ({ children }) => <h3 className="text-2xl text-slate-900">{children}</h3>;
const H4: React.FC<HtmlComponentProps> = ({ children }) => <h4 className="text-xl text-slate-900">{children}</h4>;
const H5: React.FC<HtmlComponentProps> = ({ children }) => <h5 className="text-lg text-slate-900">{children}</h5>;
const H6: React.FC<HtmlComponentProps> = ({ children }) => <h6 className="text-base text-slate-900">{children}</h6>;

// Text
const P: React.FC<HtmlComponentProps> = ({ children }) => <p className="text-base text-slate-900">{children}</p>;
const Span: React.FC<HtmlComponentProps> = ({ children }) => <span className="text-base text-slate-900">{children}</span>;

// Links
const A: React.FC<AnchorProps> = ({ children, href }) => <a href={href} className="text-blue-300 underline-offset-4 hover:underline">{children}</a>;


// Lists
const Ul: React.FC<HtmlComponentProps> = ({ children }) => <ul className="list-disc pl-5 text-base text-slate-900">{children}</ul>;
const Li: React.FC<HtmlComponentProps> = ({ children }) => <li className="text-base text-slate-900">{children}</li>;

// Blockquote
const Blockquote: React.FC<HtmlComponentProps> = ({ children }) => <blockquote className="pl-4 italic border-l-4 border-slate-200 text-base text-slate-900">{children}</blockquote>;

// Code
const Code: React.FC<HtmlComponentProps> = ({ children }) => <code className="bg-slate-200 px-0.5 rounded text-black font-mono">{children}</code>;

// Preformatted Text
const Pre: React.FC<HtmlComponentProps> = ({ children }) => <pre className="bg-slate-200 text-blueGray-700 font-mono p-2 rounded">{children}</pre>;

// Others
const Div: React.FC<HtmlComponentProps> = ({ children }) => <div className="text-base text-slate-900">{children}</div>;

export { H1, H2, H3, H4, H5, H6, P, Span, A, Ul, Li, Blockquote, Code, Pre, Div };
