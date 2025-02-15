"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { paths } from "@/routes/paths";
import { usePathname } from "@/routes/hooks";

import Logo from "@/components/logo";

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: "Yogitech",
    children: [
      { name: "About us", href: paths.about },
      { name: "Contact us", href: paths.contact },
      { name: "FAQs", href: paths.faqs },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms and Condition", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [{ name: "support@yogitech.me", href: "#" }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const homePage = pathname === "/";

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: "center",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: "auto" }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href={`${process.env.HOST_WEB_DOMAIN}/`}>
            {` www.yogitech.me`}
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <footer className="bg-background relative border-t border-grey-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4 h-8 w-auto" />
            <p className="text-muted-foreground max-w-xs text-sm">
              Yogitech is a platform that connects you with experts to enhance
              your skills.
            </p>
          </div>
          {LINKS.map((list) => (
            <div key={list.headline}>
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                {list.headline}
              </h3>
              <ul className="space-y-2">
                {list.children.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-grey-300 pt-8 md:border-t-0">
          <p className="text-muted-foreground text-center text-sm">
            © {new Date().getFullYear()} Yogitech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  return homePage ? simpleFooter : mainFooter;
}
