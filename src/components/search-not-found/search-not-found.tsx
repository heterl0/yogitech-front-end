import Typography from "@mui/material/Typography";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  query?: string;
}

export default function SearchNotFound({ query, sx, ...other }: Props) {
  const { t } = useTranslation();

  return query ? (
    <Paper
      sx={{
        bgcolor: "unset",
        textAlign: "center",
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        {t("posePage.poseSearch.searchNotFoundTitle")}
      </Typography>

      <Typography variant="body2">
        {t("posePage.poseSearch.searchNotFound", { query })}
        <br /> {t("posePage.poseSearch.tryChecking")}
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {t("posePage.poseSearch.enterKeywords")}
    </Typography>
  );
}
