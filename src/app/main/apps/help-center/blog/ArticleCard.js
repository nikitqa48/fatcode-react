import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { lighten } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Card from '@mui/material/Card';

function ArticleCard() {
  return (
    <Card
      component={Link}
      to="faqs"
      role="button"
      className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
    >
      <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
        <div className="text-2xl font-semibold">FAQs</div>
        <div className="md:max-w-160 mt-4" color="text.secondary">
          Frequently asked questions and answers
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
          Go to FAQs
        </Typography>
        <FuseSvgIcon size={20} color="secondary">
          heroicons-solid:arrow-narrow-right
        </FuseSvgIcon>
      </Box>
    </Card>
  );
}

export default ArticleCard;
