import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { lighten } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Card from '@mui/material/Card';

function ArticleCard(props) {

  return (
    <Card
      component={Link}
      to={`/apps/help-center/article/${props.article.id}`}
      role="button"
      className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
    >
      <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
        <img src={props.article.picture}/>
        <div className="text-2xl font-semibold">{props.article.title}</div>
        <div className="md:max-w-160 mt-4" color="text.secondary">
          {props.article.date_update}
        </div>
      </div>
      <Box
        className="flex items-center justify-center py-16 px-32"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.02),
        }}
      >
        <Typography color="secondary" className="mx-8">
          Читать
        </Typography>
        <FuseSvgIcon size={20} color="secondary">
          heroicons-solid:arrow-narrow-right
        </FuseSvgIcon>
      </Box>
    </Card>
  );
}

export default ArticleCard;
