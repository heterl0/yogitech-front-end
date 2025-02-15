import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import { useRouter } from "@/routes/hooks";

import Iconify from "@/components/iconify";
import SearchNotFound from "@/components/search-not-found";

import { IPose } from "@/types/pose";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: IPose[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
};

export default function PoseSearch({
  query,
  results,
  onSearch,
  hrefItem,
}: Props) {
  const router = useRouter();

  const { t } = useTranslation();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === "Enter") {
        const selectProduct = results.filter((pose) => pose.name === query)[0];

        handleClick(selectProduct.id + "");
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: "unset" }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: "bottom-start",
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t("posePage.poseSearch.searchPlaceholder")}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, pose, { inputValue }) => {
        const matches = match(pose.name, inputValue);
        const parts = parse(pose.name, matches);

        return (
          <Box
            component="li"
            {...props}
            onClick={() => handleClick(pose.id + "")}
            key={pose.id}
          >
            <Avatar
              key={pose.id}
              alt={pose.name}
              src={pose.image_url}
              variant="rounded-sm"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? "primary" : "textPrimary"}
                  sx={{
                    typography: "body2",
                    fontWeight: part.highlight
                      ? "fontWeightSemiBold"
                      : "fontWeightMedium",
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}
