export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      return (
      <main>
        <div className=" px-2 mt-10 max-md:px-2 max-lg:px-3">
        {children}
        </div>
      </main>
  ); 
}