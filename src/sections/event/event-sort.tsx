import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
};

export default function EventSort({ sort, onSort, sortOptions }: Props) {
  const popover = usePopover();
  const { t } = useTranslation();

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={
              popover.open
                ? "eva:arrow-ios-upward-fill"
                : "eva:arrow-ios-downward-fill"
            }
          />
        }
        sx={{ fontWeight: "fontWeightSemiBold" }}
      >
        {t("eventPage.sort.sortBy")}{" "}
        <Box
          component="span"
          sx={{
            ml: 0.5,
            fontWeight: "fontWeightBold",
            textTransform: "capitalize",
          }}
        >
          {t(`sort.${sort.toLowerCase()}`)}
        </Box>
      </Button>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 140 }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => {
              popover.onClose();
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
