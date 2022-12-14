import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from "../../auth/services/jwtService";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  username: yup.string().required('Введите ваше имя'),
  email: yup.string().email('Вы должны ввести действующий email').required('Введите ваш email'),
  password: yup
    .string()
    .required('Пожалуйста введите пароль.')
    .min(8, 'Пароль слишком короткий - должен содержать минимум 8 символов.'),
  re_password: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  invite: yup.string().required('Введите код приглашения'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'Условия должны быть выполнены.'),
});

const defaultValues = {
  username: '',
  email: '',
  password: '',
  re_password: '',
  invite: '',
  acceptTermsConditions: false,
};

function ClassicSignUpPage() {
  const { control, formState, handleSubmit, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit({ username, password, re_password, email, invite }) {
    jwtService
      .createUser({
        username,
        password,
        re_password,
        email,
        invite,
      })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48 hidden" src="assets/images/logo/logo.svg" alt="logo"/>
          <img className='w-50' src='assets/images/logo/logo-text-on-dark.svg'/>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Зарегистрироваться
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Уже есть аккаунт?</Typography>
            <Link className="ml-4" to="/sign-in">
              Войти
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="username"
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Ваше имя"
                  autoFocus
                  type="username"
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({field}) => (
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

            <Controller
              name="password"
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Пароль"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="re_password"
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Пароль (Подтверждение)"
                  type="password"
                  error={!!errors.re_password}
                  helperText={errors?.re_password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <Controller
              name="invite"
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Invite"
                  type="invite"
                  error={!!errors.invite}
                  helperText={errors?.invite?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({field}) => (
                <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="Я согласен с Условиями обслуживания и Политикой конфиденциальности"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Создать аккаунт
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicSignUpPage;
