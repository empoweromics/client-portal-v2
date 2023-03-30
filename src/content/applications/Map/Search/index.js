import { forwardRef, useEffect, useState } from 'react';
import {
  Avatar,
  Link,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  styled
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { useDebounce } from 'use-lodash-debounce';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
  .MuiDialog-container {
    height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px);
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function MapSearch({ projects, selectProject }) {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const debouncedSearchKey = useDebounce(searchValue, 800);
  // ------------------------------------------------------------------------------------------------
  const search = () => {
    let searchkeyWords = searchValue.split(' ');

    let searchResultsArr = projects?.features?.filter((el) => {
      return el?.properties?.name.includes(searchkeyWords);
    });
    setSearchResults(
      searchResultsArr
        .sort((a, b) => {
          return b.searchRank - a.searchRank;
        })
        .slice(0, 9)
        .reverse()
    );
  };

  // ------------------------------------------------------------------------------------------------
  const handleSearchChange = () => {
    if (searchValue) {
      search();
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    handleSearchChange();
  }, [debouncedSearchKey]);
  // ------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Search over projects">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
        TransitionProps={{ timeout: 0 }}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Typography>
              We recommend {searchResults.length} project for you{' '}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {searchResults.map((el, i) => {
                return (
                  <ListItem
                    key={i}
                    onClick={() => {
                      handleClose();
                      selectProject(el);
                    }}
                  >
                    <Hidden smDown>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            background: (theme) => theme.palette.secondary.main
                          }}
                        >
                          <HolidayVillageIcon />
                        </Avatar>
                      </ListItemAvatar>
                    </Hidden>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href="#"
                          underline="hover"
                          sx={{ fontWeight: 'bold' }}
                          variant="body2"
                        >
                          {el?.properties?.name}
                        </Link>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            lighten(theme.palette.secondary.main, 0.5)
                        }}
                      >
                        {el?.properties?.area}

                        {/* {el?.searchRank} */}
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export { MapSearch };
