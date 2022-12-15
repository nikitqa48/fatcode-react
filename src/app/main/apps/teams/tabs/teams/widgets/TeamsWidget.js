import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectTeams } from '../../../store/teamsSlice';

function TeamsWidget(props) {
  const teamsList = useSelector(selectTeams);
  const teams = teamsList.results;
  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 w-full min-w-0"
    >
      {teams.map((team) => (
        <Paper
          component={motion.div}
          variants={item}
          className="flex flex-col flex-auto items-center shadow rounded-2xl overflow-hidden"
          key={team.id}
        >
          <div className="flex flex-col flex-auto w-full p-32 text-center">
            <div className="w-128 h-128 mx-auto rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={team.avatar} alt="member" />
            </div>
            <Typography className="mt-24 font-medium">{team.name}</Typography>
            <Typography color="text.secondary">{team.tagline}</Typography>
          </div>
          <div className="flex items-center w-full border-t divide-x">
            <a
              className="flex flex-auto items-center justify-center py-16 hover:bg-hover"
              href={`mailto:${team.id}`}
              role="button"
            >
              {/*<FuseSvgIcon size={20} color="action">*/}
              {/*  heroicons-solid:mail*/}
              {/*</FuseSvgIcon>*/}
              <Typography className="ml-8">Открыть</Typography>
            </a>
            {/*<a*/}
            {/*  className="flex flex-auto items-center justify-center py-16 hover:bg-hover"*/}
            {/*  href={`tel${team?.members_count}`}*/}
            {/*  role="button"*/}
            {/*>*/}
              {/*<FuseSvgIcon size={20} color="action">*/}
              {/*  heroicons-solid:phone*/}
              {/*</FuseSvgIcon>*/}
              <Typography className="ml-8">Call</Typography>
            {/*</a>*/}
          </div>
        </Paper>
      ))}
    </motion.div>
  );
}

export default memo(TeamsWidget);
