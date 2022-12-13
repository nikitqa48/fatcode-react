import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';
import { ImageList, ImageListItem } from '@mui/material';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
 // login: yup.string().email('Введите ваш email').required('Введите ваш email'),
  password: yup
    .string()
    .required('Пожалуйста введите ваш пароль.')
    .min(4, 'Короткий пароль - должен быть не менее 4 символов.'),
});

const defaultValues = {
  login: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    // setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
    setValue('login', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  // Оставить комментарий, если нужно будет вернуть авторизацию по email
  // function onSubmit({ email, password }) {
  //   jwtService
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       // No need to do anything, user data will be set at app/auth/AuthContext
  //     })
  //     .catch((_errors) => {
  //       _errors.forEach((error) => {
  //         setError(error.type, {
  //           type: 'manual',
  //           message: error.message,
  //         });
  //       });
  //     });
  // };

  function onSubmit({login, password}) {
    jwtService.signInWithLoginAndPassword(login, password);
    // .then((user) => {
    //   // No need to do anything, user data will be set at app/auth/AuthContext
    // })
    // .catch((_errors) => {
    //   _errors.forEach((error) => {
    //     setError(error.type, {
    //       type: 'manual',
    //       message: error.message,
    //     });
    //   });
    // });
  }

  const imageCats = [
    { id: 1, img: 'assets/images/cats/cat', title: 'cat' },
    { id: 2, img: 'assets/images/cats/cat', title: 'cat' },
    { id: 3, img: 'assets/images/cats/cat', title: 'cat' },
    { id: 4, img: 'assets/images/cats/cat', title: 'cat' },
    { id: 5, img: 'assets/images/cats/cat', title: 'cat' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48 hidden" src="assets/images/logo/logo.svg" alt="logo"/>
          <img className='w-50' src='assets/images/logo/logo-text-on-dark.svg' alt='icon'/>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Вход
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Вы здесь первый раз?</Typography>
            <Link className="ml-4" to="/sign-up">
              Зарегистрироваться
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Оставить комментарий, если нужно будет вернуть авторизацию по email */}
            {/* <Controller*/}
            {/*  name="email"*/}
            {/*  control={control}*/}
            {/*  render={({ field }) => (*/}
            {/*    <TextField*/}
            {/*      {...field}*/}
            {/*      className="mb-24"*/}
            {/*      label="Email"*/}
            {/*      autoFocus*/}
            {/*      type="email"*/}
            {/*      error={!!errors.email}*/}
            {/*      helperText={errors?.email?.message}*/}
            {/*      variant="outlined"*/}
            {/*      required*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*  )}*/}
            {/*/>*/}

            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Логин"
                  type="text"
                  error={!!errors.login}
                  helperText={errors?.login?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
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

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Запомнить меня"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
{/* /pages/auth/forgot-password */}
              <Link className="text-md font-medium" to="/forgot-password">
                Забыли пароль?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Войти
            </Button>

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                или продолжить с
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 justify-center">
              <Button variant="outlined" className="px-14">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="flex justify-center text-7xl font-bold leading-none text-gray-100">
            <div>Выберите питомца</div>
          </div>

          <div className="relative mt-40 text-lg tracking-tight leading-6 text-gray-400">
            <div className='absolute w-full h-full flex justify-between items-center'>
              <FuseSvgIcon className="text-48 -ml-40" size={35} color="secondary">heroicons-solid:chevron-left</FuseSvgIcon>
              <FuseSvgIcon className="text-48 -mr-40" size={35} color="secondary">heroicons-solid:chevron-right</FuseSvgIcon>
            </div>

            <ImageList sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
            {imageCats.map((item) => (
              <ImageListItem key={item.id}>
                <div className='flex content-center'>
                  <img 
                    src={`${item.img}${item.id}.svg`}
                    alt={item.title}
                    loading='lazy'
                  /> 
                </div> 
              </ImageListItem>
            ))}
            </ImageList>
          </div>

          <div className="flex justify-center text-2xl tracking-tight leading-6 text-gray-400 mt-32">
            имя питомца
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
