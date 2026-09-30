import "@fontsource/oswald/300.css";
import "@fontsource/oswald/400.css";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata = { title: "Repas Malin – Le plaisir de cuisiner. Chaque jour.", description: "Planifiez vos repas de la semaine et générez votre liste de courses." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body>{children}</body></html>);
}
