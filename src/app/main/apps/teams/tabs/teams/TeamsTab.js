import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TeamsWidget from './widgets/TeamsWidget';
import { getTeams, selectTeams } from '../../store/teamsSlice';

function TeamsTab() {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="widget flex w-full">
        {teams.map((team) => (
          <TeamsWidget team={team} key={team.id} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default TeamsTab;
