import { Button, Collapse, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding:'10px'
  },
  text: {
    whiteSpace: 'pre-line',
    marginBottom: theme.spacing(1),
  },
  button: {
    alignSelf: 'flex-end',
    textTransform: 'none',
  },
}));

const SeeMoreComponent = ({ text }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }

    const shortText = text.substr(0, maxLength);
    const lastSpace = shortText.lastIndexOf(' ');

    if (lastSpace === -1) {
      return shortText + '...';
    }

    return shortText.substr(0, lastSpace) + '...';
  };

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.text}>
        {expanded ? text : shortenText(text, 100)}
      </Typography>
      {text.length > 100 && (
        <Button
          color="primary"
          className={classes.button}
          onClick={toggleExpanded}
          endIcon={expanded ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
        >
          {expanded ? 'See Less' : 'See More'}
        </Button>
      )}
      {/* <Collapse in={expanded}>
        <Typography variant="body1" className={classes.text}>
          {text}
        </Typography>
      </Collapse> */}
    </div>
  );
};

export  {SeeMoreComponent};