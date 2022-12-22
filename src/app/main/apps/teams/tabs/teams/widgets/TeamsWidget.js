import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memo } from 'react';

function TeamsWidget(props) {
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
      <Paper
        component={motion.div}
        variants={item}
        className="flex flex-col flex-auto items-center shadow rounded-2xl overflow-hidden"
        key={props.team.id}
      >
        <div className="flex flex-col flex-auto w-full p-32 text-center">
          <div className="w-128 h-128 mx-auto rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={props.team.avatar} alt="member" />
          </div>
          <Typography className="mt-24 font-medium">{props.team.name}</Typography>
          <Typography color="text.secondary">{props.team.tagline}</Typography>
        </div>
        <div className="flex items-center w-full border-t divide-x">
          <Button
            className="flex flex-auto items-center justify-center py-16 hover:bg-hover"
            component={Link}
            role="button"
            to={`/teams/${props.team.id}`}
          >
            <Typography className="ml-8">Открыть</Typography>
          </Button>
        </div>
      </Paper>
    </motion.div>
  );
}

export default memo(TeamsWidget);
// export default TeamsWidget;
