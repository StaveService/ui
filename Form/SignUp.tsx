import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@material-ui/core/Grid";
import ControlTextField from "../../components/ControlTextField/ControlTextField";
import LoadingButton from "../LoadingButton";
import {
  ISignErrorResponse,
  ISignSuccessResponse,
  ISignUpFormValues,
} from "./interfaces";
import { signUpSchema } from "./schema";
import {
  setHeaders,
  setCurrentUser,
} from "../../slices/currentUser/currentUser";

interface SignUpProps {
  onSuccess: () => void;
}
declare module "axios" {
  export interface AxiosRequestConfig {
    "Key-inflection"?: string;
  }
}
export const signUp = (
  data: ISignUpFormValues
): Promise<AxiosResponse<ISignSuccessResponse>> =>
  axios.post<ISignSuccessResponse>("/auth", data, {
    "Key-inflection": "camel",
  });
const SignUp: React.FC<SignUpProps> = ({ onSuccess }: SignUpProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const intl = useIntl();
  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const handleSuccess = (res: AxiosResponse<ISignSuccessResponse>) => {
    dispatch(setCurrentUser(res.data.data));
    dispatch(setHeaders(res.headers));
    enqueueSnackbar(intl.formatMessage({ id: "signupSuccessful" }), {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
    onSuccess();
  };
  const onError = (
    err: AxiosError<ISignErrorResponse<{ ["full_messages"]: string[] }>>
  ) => {
    if (err.response) {
      err.response.data.errors.full_messages.forEach((message) =>
        enqueueSnackbar(message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        })
      );
    } else {
      enqueueSnackbar(String(err), {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };
  const { isLoading, mutate } = useMutation(
    (newUser: ISignUpFormValues) => signUp(newUser),
    { onSuccess: handleSuccess, onError }
  );
  const onSubmit = (data: ISignUpFormValues) => mutate(data);
  return (
    <Box m={3}>
      <Typography variant="h4" align="center">
        <FormattedMessage id="signup" />
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlTextField
          name="nickname"
          defaultValue=""
          label={intl.formatMessage({ id: "nickname" })}
          variant="outlined"
          margin="normal"
          control={control}
          errors={errors}
          disabled={isLoading}
          fullWidth
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ControlTextField
              name="familyname"
              defaultValue=""
              label={intl.formatMessage({ id: "familyname" })}
              variant="outlined"
              control={control}
              errors={errors}
              disabled={isLoading}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <ControlTextField
              name="givenname"
              defaultValue=""
              label={intl.formatMessage({ id: "givenname" })}
              variant="outlined"
              control={control}
              errors={errors}
              disabled={isLoading}
              fullWidth
            />
          </Grid>
        </Grid>
        <ControlTextField
          type="email"
          name="email"
          defaultValue=""
          label={intl.formatMessage({ id: "email" })}
          variant="outlined"
          margin="normal"
          control={control}
          errors={errors}
          disabled={isLoading}
          fullWidth
        />
        <ControlTextField
          type="password"
          name="password"
          defaultValue=""
          label={intl.formatMessage({ id: "password" })}
          variant="outlined"
          margin="normal"
          control={control}
          errors={errors}
          disabled={isLoading}
          fullWidth
        />
        <ControlTextField
          type="password"
          name="password_confirmation"
          defaultValue=""
          label={intl.formatMessage({ id: "passwordConfirmation" })}
          variant="outlined"
          margin="normal"
          control={control}
          errors={errors}
          disabled={isLoading}
          fullWidth
        />
        <LoadingButton
          type="submit"
          loading={isLoading}
          color="primary"
          fullWidth
        >
          <FormattedMessage id="signup" />
        </LoadingButton>
      </form>
    </Box>
  );
};

export default SignUp;
