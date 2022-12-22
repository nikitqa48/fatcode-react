import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import { Link } from 'react-router-dom';

function TeamsAppHeader(props) {
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <Avatar className="flex-0 w-64 h-64" alt="user photo" src={user?.avatar}>
            {user?.username[0]}
          </Avatar>
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              {`Welcome back, ${user.username}!`}
            </Typography>

            <div className="flex items-center">
              <FuseSvgIcon size={20} color="action">
                heroicons-solid:bell
              </FuseSvgIcon>
              <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                У вас 25 новых запросов в команду
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="success"
            startIcon={<FuseSvgIcon size={20}>heroicons-solid:pencil</FuseSvgIcon>}
          >
            Создать
          </Button>
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon size={20}>heroicons-solid:cog</FuseSvgIcon>}
          >
            Settings
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          component={Link}
          to="all"
          className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
          variant="default"
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            borderColor: (theme) => theme.palette.divider,
          }}
          // endIcon={
          // <FuseSvgIcon size={20} color="action">
          //   heroicons-solid:chevron-down
          // </FuseSvgIcon>
          // /*}*/
        >
          Все команды
        </Button>

        <Button
          component={Link}
          to="/teams/my"
          className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          Мои команды
        </Button>
      </div>
    </div>
  );
}

export default TeamsAppHeader;
