import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
};

export default function PostSort({ sort, sortOptions, onSort }: Props) {
  const { t } = useTranslation();
  const popover = usePopover();

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
        sx={{ fontWeight: "fontWeightSemiBold", textTransform: "capitalize" }}
      >
        {t("blogPage.sort.sortBy")}
        <Box component="span" sx={{ ml: 0.5, fontWeight: "fontWeightBold" }}>
          {t("sort." + sort.toLowerCase())}
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
            selected={sort === option.value}
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
