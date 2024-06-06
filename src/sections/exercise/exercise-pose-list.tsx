import Box from "@mui/material/Box";
import ExercisePoseItem from "./exercise-pose-item";
import { IPoseWithTime } from "@/types/exercise";
import { Card, Typography } from "@mui/material";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  posesWithTime: IPoseWithTime[];
  onRemove: (index: number) => void;
  onAppend: VoidFunction;
  onSelect: (index: number) => void;
  poseSelectedIndex: number;
};

export default function ExercisePoseList({
  posesWithTime,
  onSelect,
  onRemove,
  onAppend,
  poseSelectedIndex,
}: Props) {
  const { t } = useTranslation();
  return (
    <>
      <div className="max-h-[512px] overflow-y-scroll rounded-md">
        <Scrollbar>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            padding={1}
          >
            {posesWithTime.map(
              (poseWithTime, index) =>
                poseWithTime && (
                  <ExercisePoseItem
                    key={index}
                    poseWithTime={poseWithTime}
                    onSelect={() => onSelect(index)}
                    onRemove={() => onRemove(index)}
                    isSelected={index === poseSelectedIndex}
                  />
                )
            )}
            <Card
              className="flex min-h-[258px] cursor-pointer flex-col items-center justify-center"
              onClick={onAppend}
            >
              <Iconify icon="ic:baseline-plus" />
              <Typography> {t("exercisePage.addPose")}</Typography>
            </Card>
          </Box>
        </Scrollbar>
      </div>
    </>
  );
}
