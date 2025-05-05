import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { m } from "motion/react";
import { useTranslate } from "@/locales";
import { varFade } from "@/components/animate";
import Image from "next/image";

export default function HomeFAQ() {
  const { t } = useTranslate();
  const faqData = [
    {
      question: t("home.faq.question1"),
      answer: t("home.faq.answer1"),
    },
    {
      question: t("home.faq.question2"),
      answer: t("home.faq.answer2"),
    },
    {
      question: t("home.faq.question3"),
      answer: t("home.faq.answer3"),
    },
    {
      question: t("home.faq.question4"),
      answer: t("home.faq.answer4"),
    },
    {
      question: t("home.faq.question5"),
      answer: t("home.faq.answer5"),
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ mb: 10, textAlign: "center" }}>
        <m.div variants={varFade().inUp} id="faqs">
          <Typography
            component="div"
            variant="overline"
            sx={{ mb: 2, color: "text.disabled" }}
            className="!text-gray-500"
          >
            {t("home.faq.overline")}
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">{t("home.faq.title")}</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ color: "text.secondary" }}>
            {t("home.faq.description")}
          </Typography>
        </m.div>
      </Stack>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          {faqData.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<Icon icon="mdi:chevron-down" />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    display: "inline-flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    icon="mdi:question-mark-circle-outline"
                    inline={true}
                    style={{ marginRight: "8px" }}
                  />
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Box
            sx={{
              height: "100%",
              minHeight: "400px",
              backgroundImage: 'url("/banner-2.png?height=400&width=600")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          /> */}
          <div className="flex flex-row justify-center">
            <Image
              src="/banner-2.png"
              alt="FAQ Image"
              width={600}
              height={400}
              priority={false}
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="rounded-lg shadow-lg"
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
