import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ClassicForgotPasswordPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48 hidden" src="assets/images/logo/logo.svg" alt="logo" />
          <img className='w-50' src='assets/images/logo/logo-text-on-dark.svg'/>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Забыли пароль?
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Заполните форму для сброса пароля</Typography>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Отправить ссылку сброса пароля
            </Button>

            <Typography className="mt-32 text-md font-medium" color="text.secondary">
              <span>Вспомнили пароль</span>
              <Link className="ml-4" to="/sign-in">
                войти
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicForgotPasswordPage;
