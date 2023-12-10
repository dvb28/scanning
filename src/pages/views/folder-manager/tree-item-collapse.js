import { Box, Button, CircularProgress, Collapse, Tooltip, Typography } from '@mui/material';
import React from 'react';
import TreeItemActions from './tree-item-actions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import Toasts from '@/utils/toasts';
import { useRouter } from 'next/navigation';

const ArrowSquare = ({ collapse }) => {
  return (
    <ArrowRightIcon
      sx={{
        transition: 'all 0.2s ease',
        transform: `${collapse ? 'rotate(90deg)' : 'rotate(0deg)'}`,
      }}
    ></ArrowRightIcon>
  );
};

export default function TreeItemCollapse({
  item,
  recursive,
  getChildFolders,
  nodeHandle,
  isAction,
  parentAction,
  parentData,
  isSearch,
}) {
  // Tree Child State
  const [treeData, setTreeData] = React.useState(item);

  // Anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Route
  const route = useRouter();

  // Change Route
  const changeRoute = React.useCallback((path) => route.push(path), [route]);

  // Collapse State
  const [collapse, setCollapse] = React.useState(false);

  // First Change
  const [firstChange, setFirstChange] = React.useState(false);

  // Tree Item loading
  const [trItemLoading, setTrItemLoading] = React.useState(false);

  // Handle Change Collapse
  const changeCollapse = () => setCollapse((prev) => !prev);

  // refreshChildFolders
  const refreshChildFolders = React.useCallback(
    async (folderId) => {
      // Get Child Folder
      const folders = await getChildFolders(folderId, changeRoute);

      // Set Tree Data
      setTreeData((prev) => ({ ...prev, subs: folders }));
    },
    [changeRoute, getChildFolders]
  );

  // Tree Item Click
  const treeItemClick = React.useCallback(async () => {
    // Check lock
    if (treeData.isLock === 0) {
      // Check Type
      if (treeData.type === 'folder') {
        // Enable Tree Item Loading
        setTrItemLoading(true);

        // Check First Change
        if (firstChange === false) {
          // Call refreshChildFolders
          await refreshChildFolders(treeData.id);

          // Set First Change
          setFirstChange(true);
        }

        // Change Collapse
        changeCollapse();

        // Disable Tree Item Loading
        setTrItemLoading(false);
      }
    } else {
      // Show Error
      Toasts.error('Thư mục này đã bị khoá bởi chủ sở hữu');
    }

    // Call Node Handle
    nodeHandle && nodeHandle(treeData);
  }, [firstChange, nodeHandle, refreshChildFolders, treeData]);

  const handleRightClick = (e) => {
    // Set Anchor
    e.preventDefault();

    console.log(e);

    // Set Anchor
    setAnchorEl(e.currentTarget);
  };

  // Return
  return treeData !== null ? (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        id="this-tree-item"
        aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        onContextMenu={handleRightClick}
      >
        <Tooltip title={treeData.name} placement="bottom-end">
          <Button
            variant="text"
            sx={{
              textTransform: 'revert-layer',
              justifyContent: 'flex-start',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              width: '100%',
              color: '#000',
              overflowX: 'hidden',
            }}
            onClick={treeItemClick}
          >
            <Box
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                flex: 1,
              }}
            >
              {treeData.type === 'file' ? (
                <PictureAsPdfIcon color="error" fontSize="small" sx={{ marginRight: 1 }} />
              ) : (
                <>
                  <ArrowSquare collapse={treeData.isLock === 0 ? collapse : false} />
                  <FolderIcon
                    fontSize="small"
                    sx={{ marginRight: 1, color: 'rgb(247, 190, 79)' }}
                  />
                </>
              )}
              <Typography noWrap sx={{ fontSize: '14px' }}>
                <span
                  className="folder-name"
                  dangerouslySetInnerHTML={{
                    __html: isSearch && treeData?.highlight ? treeData.highlight : treeData.name,
                  }}
                />
              </Typography>
            </Box>
            {treeData.type === 'folder' && trItemLoading && (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress size={15} />
              </Box>
            )}
            {treeData.isLock == 1 && (
              <Box sx={{ display: 'flex' }}>
                <LockPersonOutlinedIcon color="action" sx={{ fontSize: '15px' }} />
              </Box>
            )}
          </Button>
        </Tooltip>
        {isAction && (
          <TreeItemActions
            parentAction={parentAction}
            parentData={parentData}
            nodeHandle={nodeHandle}
            data={treeData}
            actions={setTreeData}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />
        )}
      </Box>
      {treeData.type === 'folder' && treeData.isLock === 0 && (
        <Collapse
          className="hidden-scrollbar"
          sx={{
            borderLeft: '0.5px solid rgba(128, 128, 128, 0.5)',
            marginLeft: '17px',
            maxHeight: '200px',
            overflow: 'auto',
          }}
          in={collapse}
        >
          {treeData?.subs && recursive && recursive(treeData.subs, setTreeData, treeData)}
        </Collapse>
      )}
    </Box>
  ) : (
    <></>
  );
}
