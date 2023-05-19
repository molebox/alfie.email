import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "../../components/email-template";

const key = process.env.EMAIL_API_KEY;

const resend = new Resend(key);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.sendEmail({
      from: "hello@alfie.email",
      to: ["to@example.com"],
      subject: "hello world",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      react: EmailTemplate({ firstName: "John", product: "Resend" }),
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
