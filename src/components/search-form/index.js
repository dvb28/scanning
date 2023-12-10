import TreeItem from '@/pages/views/folder-manager/tree-item';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { memo } from 'react';
import { TransitionGroup } from 'react-transition-group';

const SearchForm = ({ data, nodeHandle}) => {
  // State
  const [searchData, setSearchData] = React.useState(data);

  const [isLoading, setIsLoading] = React.useState(false);

  //   Use Effect
  React.useEffect(() => {
    // Handle
    const hanldeSetSearchData = () => {
      // Enable Loading
      setIsLoading(true);

      // Clear Data
      setSearchData([]);

      //  Set Data With Time Out
      setTimeout(() => {
        // Set Search Data
        setSearchData(data);

        // Disable Loading
        setIsLoading(false);
      }, 400);
    };

    // Call
    hanldeSetSearchData();
  }, [data]);

  return (
    <Box>
      <Typography sx={{ fontSize: 15, marginBottom: 0, py: 1 }} color="text.secondary" gutterBottom>
        Kết quả tìm kiếm
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: '10px' }}>
          <CircularProgress size={15} />
        </Box>
      ) : searchData.length > 0 ? (
        <Box>
          <TransitionGroup>
            <TreeItem nodeHandle={nodeHandle} treeData={searchData} isAction={false} isSearch={true}/>
          </TransitionGroup>
        </Box>
      ) : (
        <Typography
          sx={{ fontSize: 15, marginBottom: 0, py: 1, textAlign: 'center'}}
          gutterBottom
        >
          Không có kết quả tìm kiếm nào
        </Typography>
      )}
    </Box>
  );
};

export default memo(SearchForm);
