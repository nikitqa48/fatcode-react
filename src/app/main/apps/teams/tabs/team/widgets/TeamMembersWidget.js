import Typography from '@mui/material/Typography';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { getTeamMembers, selectTeamMembers } from '../../../store/teamSlice';

function TeamMembersWidget(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const members = useSelector(selectTeamMembers);

  useEffect(() => {
    dispatch(getTeamMembers(routeParams.teamId));
  }, [dispatch, routeParams.teamId]);

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
      {members.map((member) => (
        <Paper
          component={motion.div}
          variants={item}
          className="flex flex-col flex-auto items-center shadow rounded-2xl overflow-hidden"
          key={member.id}
        >
          <div className="flex flex-col flex-auto w-full p-32 text-center">
            <div className="w-128 h-128 mx-auto rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={member.user.avatar} alt="member" />
            </div>
            <Typography className="mt-24 font-medium">{member.user.username}</Typography>
            <Typography color="text.secondary">{member.title}</Typography>
          </div>
          <div className="flex items-center w-full border-t divide-x">
            <a
              className="flex flex-auto items-center justify-center py-16 hover:bg-hover"
              href={`${member.user.id}`}
              role="button"
            >
              <Typography className="ml-8">Профиль</Typography>
            </a>
          </div>
        </Paper>
      ))}
    </motion.div>
  );
}

export default memo(TeamMembersWidget);
