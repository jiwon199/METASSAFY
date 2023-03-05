import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: 160,
        height: 160,
      }}
    >
      <CircularProgress
        style={{ color: '#6096B4' }}
        variant="determinate"
        {...props}
        size="160px"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 160,
          height: 160,
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize="2rem"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
