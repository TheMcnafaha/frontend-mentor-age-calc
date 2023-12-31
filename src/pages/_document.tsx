import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;1,400;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-template_off_white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
