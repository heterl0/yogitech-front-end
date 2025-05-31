"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { paths } from "@/routes/paths";
import Logo from "@/components/logo";
import { useTranslate } from "@/locales";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

// ----------------------------------------------------------------------

export default function Footer() {
  const { t } = useTranslate();
  const pathname = usePathname();
  const isDark = pathname === paths.about;

  const LINKS = [
    {
      headline: t("footer.zenaiyoga"),
      children: [
        { name: t("footer.about"), href: paths.about },
        { name: t("footer.contact"), href: paths.contact },
        { name: t("footer.faqs"), href: paths.faqs },
      ],
    },
    {
      headline: t("footer.legal"),
      children: [
        { name: t("footer.terms"), href: paths.termsAndConditions },
        { name: t("footer.privacy"), href: paths.privacyPolicy },
      ],
    },
    {
      headline: t("footer.contactHeader"),
      children: [{ name: t("footer.supportEmail"), href: "#" }],
    },
  ];

  const homePage = false;

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
          {t("footer.rights")}
          <br />
          {t("footer.madeBy")}
          <Link href={`${process.env.HOST_WEB_DOMAIN}/`}>
            {" "}
            {t("footer.website")}
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <footer
      className={cn(
        "relative border-t",
        isDark
          ? "dark border-gray-800 bg-gray-900"
          : "bg-background border-grey-300"
      )}
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4 h-8 w-auto" />
            <p
              className={cn(
                "max-w-xs text-sm",
                isDark ? "text-gray-400" : "text-muted-foreground"
              )}
            >
              {t("footer.description")}
            </p>
          </div>
          {LINKS.map((list) => (
            <div key={list.headline}>
              <h3
                className={cn(
                  "mb-4 text-sm font-semibold",
                  isDark ? "text-[#eee]" : "text-foreground"
                )}
              >
                {list.headline}
              </h3>
              <ul className="space-y-2">
                {list.children.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors",
                        isDark
                          ? "text-gray-400 hover:text-[#eee]"
                          : "!text-[#4b799b] hover:!text-[#3b607d]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "mt-12 border-t pt-8 md:border-t-0",
            isDark ? "border-gray-800" : "border-grey-300"
          )}
        >
          <p
            className={cn(
              "text-center text-sm",
              isDark ? "text-gray-400" : "text-muted-foreground"
            )}
          >
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );

  return homePage ? simpleFooter : mainFooter;
}
