// src/lib/auth.ts
import nodemailer from 'nodemailer';

interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: {
    server: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
}

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) {
  const { host, port, auth } = provider.server;
  const from = provider.from;

  const transport = nodemailer.createTransport({
    host,
    port,
    auth,
  });

  try {
    await transport.sendMail({
      to: identifier,
      from,
      subject: 'Sign in to Your App',
      text: `Click here to sign in: ${url}`,
      html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
    });
  } catch (error) {
    console.error('Error sending verification email', error);
    throw new Error('Error sending verification email');
  }
}
