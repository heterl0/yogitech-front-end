import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { memo } from "react";
function Testing() {
  return (
    <Stack spacing={1} alignItems="center">
      <Button variant="contained">Button</Button>
      <Button variant="contained" color="primary">
        Button
      </Button>
      <Button variant="contained" color="secondary">
        Button
      </Button>
      <Button variant="contained" color="info">
        Button
      </Button>
      <Button variant="contained" color="success">
        Button
      </Button>
      <Button variant="contained" color="warning">
        Button
      </Button>
      <Button variant="contained" color="error">
        Button
      </Button>
      <Button disabled variant="contained">
        Button
      </Button>
    </Stack>
  );
}

export default memo(Testing);
