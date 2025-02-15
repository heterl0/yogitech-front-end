import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";
import { varFade } from "@/components/animate";

const faqData = [
  {
    question: "What is YogiTech?",
    answer:
      "YogiTech is an AI-powered yoga mentor that provides real-time feedback on your poses using your phone’s camera. It supports both English and Vietnamese, helping users improve their techniques and avoid injuries.",
  },
  {
    question: "How do I use this application?",
    answer:
      "You can download the YogiTech app on Android through Google Play Store and start your yoga journey today!",
  },
  {
    question: "Is YogiTech available on iOS?",
    answer:
      "Currently, we are working on developing an iOS version, but integrating AI on iOS presents some challenges. Stay tuned for updates!",
  },
  {
    question: "What features are available in the free plan?",
    answer:
      "With the free plan, you can access almost all features, including AI-powered yoga pose detection, progress tracking to monitor your improvement, calorie tracking to measure your burned calories, and much more—all for free!",
  },
  {
    question: "Does YogiTech have a premium plan?",
    answer:
      "At the moment, YogiTech does not offer a premium plan. However, we plan to introduce one in the future with more advanced features, an ad-free experience, and enhanced AI-driven exercises to make your practice even more effective!",
  },
];

export default function HomeFAQ() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ mb: 10, textAlign: "center" }}>
        <m.div variants={varFade().inUp}>
          <Typography
            component="div"
            variant="overline"
            sx={{ mb: 2, color: "text.disabled" }}
          >
            Frequency Asked Questions
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            Những câu hỏi thường gặp về Yogitech?
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ color: "text.secondary" }}>
            Bạn có thể tham khảo qua những câu hỏi thường gặp dưới đây để hiểu
            rõ hơn về Yogitech.
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
          <Box
            sx={{
              height: "100%",
              minHeight: "400px",
              backgroundImage: 'url("/banner-2.png?height=400&width=600")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
