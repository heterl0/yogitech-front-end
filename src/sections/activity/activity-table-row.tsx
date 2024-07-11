import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import { useLocales } from "@/locales";
import { IExerciseLog } from "@/types/exercise";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

type Props = {
  row: IExerciseLog;
};

export default function ActivityTableRow({ row }: Props) {
  const {
    exercise,
    user,
    calories,
    point,
    complete_pose,
    created_at,
    total_time_finish,
    process,
    result,
    exp,
  } = row;
  const { currentLang } = useLocales();
  const dateFormatted = format(new Date(created_at), "HH:mm dd MMM yyyy", {
    locale: currentLang.adapterLocale,
  });

  const router = useRouter();

  const handleUserClick = () => {
    router.push(`/dashboard/user/${user}/edit`);
  };

  const handleExerciseClick = () => {
    router.push(`/dashboard/exercise/${exercise}`);
  };

  return (
    <>
      <TableRow hover>
        <TableCell onClick={handleExerciseClick} sx={{ whiteSpace: "nowrap" }}>
          {exercise}
        </TableCell>
        <TableCell onClick={handleUserClick} sx={{ whiteSpace: "nowrap" }}>
          {user}
        </TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{process}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{complete_pose}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{result}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{point}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{exp}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{calories}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{total_time_finish}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{dateFormatted}</TableCell>
      </TableRow>
    </>
  );
}
