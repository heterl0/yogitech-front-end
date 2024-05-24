/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import Label from "@/components/label";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  // RHFSwitch,
  RHFTextField,
  RHFSelect,
} from "@/components/hook-form";

import { IAccount } from "@/types/user";
import { MenuItem } from "@mui/material";
import { USER_STATUS_OPTIONS } from "@/_mock";
// import { getFieldFromHeaderElem } from "@mui/x-data-grid/utils/domUtils";

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IAccount;
};

export default function AccountNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewAccountSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phone: Yup.string().required("Phone number is required"),
    status: Yup.string().required("Status is required"),
    role: Yup.string().required("Role is required"),
    provider: Yup.string().required("Provider is required"),
  });

  const defaultValues = useMemo(
    () => ({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      status:
        currentUser?.active_status === 0
          ? "banned"
          : currentUser?.is_active === 0
            ? "pending"
            : "active",
      role: currentUser?.is_staff
        ? "Admin"
        : currentUser?.is_premium
          ? "Premium User"
          : "User",
      provider: currentUser?.auth_provider || "",
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? "Update success!" : "Create success!");
      router.push(paths.dashboard.user.list);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === "active" && "success") ||
                  (values.status === "banned" && "error") ||
                  "warning"
                }
                sx={{ position: "absolute", top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === "banned"}
                        onChange={(event) =>
                          field.onChange(
                            event.target.checked ? "banned" : "active"
                          )
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: "space-between" }}
              />
            )}

            <FormControlLabel
              labelPlacement="start"
              control={
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value === "active"}
                      onChange={(event) =>
                        field.onChange(
                          event.target.checked ? "active" : "pending"
                        )
                      }
                    />
                  )}
                />
              }
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabling this will automatically send the user a
                    verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, mb: 3, width: 1, justifyContent: "space-between" }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField
                name="username"
                disabled={currentUser ? true : false}
                label="Username"
              />
              <RHFTextField
                name="email"
                disabled={currentUser ? true : false}
                label="Email Address"
              />

              <RHFSelect name="status" label="Status">
                {USER_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="phone" label="Phone Number" />

              {/* <RHFAutocomplete
              name="country"
              type="country"
              label="Country"
              placeholder="Choose a country"
              fullWidth
              options={countries.map((option) => option.label)}
              getOptionLabel={(option) => option}
            /> */}
              <RHFSelect name="role" label="Role">
                {["Admin", "Premium User", "User"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect name="provider" label="Provider">
                {["Email", "Google"].map((value) => (
                  <MenuItem key={value} value={value.toLowerCase()}>
                    {value}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentUser ? "Create User" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
