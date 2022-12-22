import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TeamsWidget from '../teams/widgets/TeamsWidget';
import { getMyTeams, selectMyTeams } from '../../store/teamsSlice';

function MyTeam() {
  const dispatch = useDispatch();
  const teams = useSelector(selectMyTeams);

  useEffect(() => {
    dispatch(getMyTeams());
  }, [dispatch]);

  return (
    <FusePageCarded
      // header={
      //   <div>Header</div>
      // }
      content={teams.map((team) => (
        <TeamsWidget team={team} key={team.id} />
      ))}
      // leftSidebarContent={
      //   <div>Left Sidebar Content</div>
      // }
      // rightSidebarContent={
      //   <div>Right Sidebar Content</div>
      // }
      scroll="page"
    />
  );
}

export default MyTeam;
