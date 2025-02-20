"use client";

import { m, useScroll } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { memo } from "react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import { useTranslate } from "@/locales";

function TermsAndConditionsView() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const { scrollYProgress } = useScroll();
  const { t } = useTranslate();

  // Translated sections using t(...)
  const sections = [
    {
      title: t("termsAndConditions.sections.introduction.title"),
      icon: "mdi:file-document-outline",
      content: t("termsAndConditions.sections.introduction.content"),
    },
    {
      title: t("termsAndConditions.sections.userEligibility.title"),
      icon: "mdi:account-check",
      content: [
        t("termsAndConditions.sections.userEligibility.content1"),
        t("termsAndConditions.sections.userEligibility.content2"),
      ],
    },
    {
      title: t("termsAndConditions.sections.useOfServices.title"),
      icon: "mdi:hand-peace",
      content: [
        t("termsAndConditions.sections.useOfServices.content1"),
        t("termsAndConditions.sections.useOfServices.content2"),
        t("termsAndConditions.sections.useOfServices.content3"),
      ],
      note: t("termsAndConditions.sections.useOfServices.note"),
    },
    {
      title: t("termsAndConditions.sections.userAccountsData.title"),
      icon: "mdi:account-key",
      content: [
        t("termsAndConditions.sections.userAccountsData.content1"),
        t("termsAndConditions.sections.userAccountsData.content2"),
        t("termsAndConditions.sections.userAccountsData.content3"),
      ],
    },
    {
      title: t("termsAndConditions.sections.paymentSubscription.title"),
      icon: "mdi:credit-card",
      content: t("termsAndConditions.sections.paymentSubscription.content"),
    },
    {
      title: t("termsAndConditions.sections.dataCollectionPrivacy.title"),
      icon: "mdi:shield-lock",
      content: [
        t("termsAndConditions.sections.dataCollectionPrivacy.content1"),
        t("termsAndConditions.sections.dataCollectionPrivacy.content2"),
      ],
    },
    {
      title: t("termsAndConditions.sections.thirdPartyServices.title"),
      icon: "mdi:share-variant",
      content: t("termsAndConditions.sections.thirdPartyServices.content"),
    },
    {
      title: t("termsAndConditions.sections.limitationOfLiability.title"),
      icon: "mdi:alert-circle",
      content: [
        t("termsAndConditions.sections.limitationOfLiability.content1"),
        t("termsAndConditions.sections.limitationOfLiability.content2"),
      ],
    },
    {
      title: t("termsAndConditions.sections.terminationOfService.title"),
      icon: "mdi:close-circle",
      content: t("termsAndConditions.sections.terminationOfService.content"),
    },
    {
      title: t("termsAndConditions.sections.changesToTerms.title"),
      icon: "mdi:update",
      content: t("termsAndConditions.sections.changesToTerms.content"),
    },
    {
      title: t("termsAndConditions.sections.contactInformation.title"),
      icon: "mdi:email",
      content: t("termsAndConditions.sections.contactInformation.content"),
    },
  ];

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Container maxWidth="lg" className="py-12">
        <m.div {...fadeIn}>
          <Typography
            variant="h2"
            component="h1"
            className="mb-8 text-center text-4xl font-bold"
          >
            {t("termsAndConditions.title")}
          </Typography>

          <Typography
            variant="subtitle1"
            className="mb-12 text-center text-gray-600"
          >
            {t("termsAndConditions.effectiveDate")}
          </Typography>

          <Box className="space-y-8">
            {sections.map((section, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Accordion
                  className="shadow-sm transition-shadow duration-300 hover:shadow-md"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<Icon icon="mdi:chevron-down" />}
                    className="hover:bg-gray-50"
                  >
                    <Box className="flex items-center gap-3">
                      <Icon
                        icon={section.icon}
                        className="text-primary text-2xl"
                      />
                      <Typography
                        variant="h6"
                        component="h2"
                        className="font-semibold"
                      >
                        {section.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {section.note && (
                      <Typography
                        variant="body2"
                        className="mb-4 text-gray-600 italic"
                      >
                        {section.note}
                      </Typography>
                    )}

                    {Array.isArray(section.content) ? (
                      <List>
                        {section.content.map((item, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <Icon
                                icon="mdi:check-circle"
                                className="text-green-500"
                              />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body1">{section.content}</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </m.div>
            ))}
          </Box>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <Typography variant="body2" className="text-gray-600">
              {t("termsAndConditions.footerText")}
            </Typography>
          </m.div>
        </m.div>
      </Container>
    </MainLayout>
  );
}

export default memo(TermsAndConditionsView);
