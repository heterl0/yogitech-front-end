"use client";

import { m, useScroll } from "motion/react";
import { Icon } from "@iconify/react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { memo } from "react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import { useTranslate } from "@/locales";

function PrivacyPolicyView() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const { scrollYProgress } = useScroll();
  const { t } = useTranslate();

  const sections = [
    {
      title: t("privacyPolicy.sections.introduction.title"),
      icon: "mdi:shield-lock-outline",
      content: t("privacyPolicy.sections.introduction.content"),
    },
    {
      title: t("privacyPolicy.sections.informationWeCollect.title"),
      icon: "mdi:database",
      content: [
        t("privacyPolicy.sections.informationWeCollect.content1"),
        t("privacyPolicy.sections.informationWeCollect.content2"),
        t("privacyPolicy.sections.informationWeCollect.content3"),
      ],
    },
    {
      title: t("privacyPolicy.sections.howWeUseYourInformation.title"),
      icon: "mdi:cog-outline",
      content: [
        t("privacyPolicy.sections.howWeUseYourInformation.content1"),
        t("privacyPolicy.sections.howWeUseYourInformation.content2"),
        t("privacyPolicy.sections.howWeUseYourInformation.content3"),
      ],
    },
    {
      title: t("privacyPolicy.sections.thirdPartyServices.title"),
      icon: "mdi:share-variant",
      content: [
        t("privacyPolicy.sections.thirdPartyServices.content1"),
        t("privacyPolicy.sections.thirdPartyServices.content2"),
        t("privacyPolicy.sections.thirdPartyServices.content3"),
      ],
      note: t("privacyPolicy.sections.thirdPartyServices.note"),
    },
    {
      title: t("privacyPolicy.sections.userRightsDataControl.title"),
      icon: "mdi:account-check",
      content: [
        t("privacyPolicy.sections.userRightsDataControl.content1"),
        t("privacyPolicy.sections.userRightsDataControl.content2"),
        t("privacyPolicy.sections.userRightsDataControl.content3"),
      ],
    },
    {
      title: t("privacyPolicy.sections.dataSecurity.title"),
      icon: "mdi:security",
      content: t("privacyPolicy.sections.dataSecurity.content"),
    },
    {
      title: t("privacyPolicy.sections.contactUs.title"),
      icon: "mdi:email",
      content: t("privacyPolicy.sections.contactUs.content"),
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
            {t("privacyPolicy.title")}
          </Typography>

          <Typography
            variant="subtitle1"
            className="mb-12 text-center text-gray-600"
          >
            {t("privacyPolicy.effectiveDate")}
          </Typography>

          <Box className="space-y-8">
            {sections.map((section, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="transition-shadow duration-300 hover:shadow-lg"
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <CardContent>
                    <Box className="mb-4 flex items-center gap-3">
                      <Icon
                        icon={section.icon}
                        className="text-primary text-3xl"
                      />
                      <Typography
                        variant="h5"
                        component="h2"
                        className="font-semibold"
                      >
                        {section.title}
                      </Typography>
                    </Box>

                    <Divider className="mb-4" />

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
                        {section.note && (
                          <Typography
                            variant="body2"
                            className="mt-2 text-gray-600 italic"
                          >
                            {section.note}
                          </Typography>
                        )}
                      </List>
                    ) : (
                      <Typography variant="body1">{section.content}</Typography>
                    )}
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </Box>
        </m.div>
      </Container>
    </MainLayout>
  );
}

export default memo(PrivacyPolicyView);
