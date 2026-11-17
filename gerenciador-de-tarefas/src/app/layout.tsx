import Provider from "../trpc/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}