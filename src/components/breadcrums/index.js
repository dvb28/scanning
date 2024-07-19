import React, { memo } from 'react';
import { Box, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ScanningContext } from '@/context/scanning-context';
import { fetcherGet } from '@/utils/fetcher';

 function Breadcrums() {
     // Statis State
     const [thisPath, setThisPath] = React.useState(null);
     
     // Folder Context
     const folderContext = React.useContext(ScanningContext).folders;

     // Handle change folder
     const handleChangeFolder = () => {};

     // Handle set thisPath
     React.useEffect(() => {
          // Handle set thisPath
          const handleGetPath = async (data) => {
               // Check
               if(data) {
                    // Response
                    const response = await fetcherGet(`/folders/get-all-path`, {id: data.id});

                    // Check
                    if(response.status === 200) {
                         // Split
                         const bredcrums = response.data.filter((item) => { if(item) return item }, []).reverse();

                         // Set
                         setThisPath(bredcrums);
                    }
                    
               }
          };
          // Calling
          handleGetPath(folderContext.get);
     }, [folderContext.get]);

     // Return
     return (
          <Box sx={{display: 'flex', alignItems: 'center', py: 1}}>
               { thisPath && thisPath.length > 0 
               && thisPath.map((item, index) => (
                    <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
                         <Button 
                              variant='text' 
                              sx={{
                                   display: 'flex', 
                                   alignItems: 'center',
                                   textTransform: 'none',
                                   fontSize: '13px', 
                                   fontWeight: folderContext.get?.name === item ? '600!important' : '400!important',
                                   color: folderContext.get?.name === item ? '#343a40!important' : '#495057!important'
                              }}
                              onClick={() => handleChangeFolder()}
                         >
                              {item}
                         </Button>
                         { index < thisPath.length - 1 && <ChevronRightIcon sx={{margin: '0 5px', fontSize: '13px'}}/>}
                    </Box>
               ))
               }
          </Box>)
}

export default memo(Breadcrums);


