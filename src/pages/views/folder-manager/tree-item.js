import React from 'react';
import TreeItemCollapse from './tree-item-collapse';
import { Box } from '@mui/material';
import getChildFolders from '@/handlers/getChildFolders';

export default function TreeItem({ treeData, nodeHandle, isAction = true, isSearch }) {
  const [root, setRoot] = React.useState(null);

  // Format Date and time
  const formatDatetime = React.useCallback((dateString) => {
    // Create New Date
    const objDate = new Date(dateString);

    // Format Date
    const date = objDate.toLocaleDateString();

    // Format Time
    const time = objDate.toLocaleTimeString();

    return { date, time };
  }, []);

  // Render Handle
  const renderTree = React.useCallback(
    (treeData, parentAction, parentData) => {
      // Return
      return treeData.map((item, index) => {
        // Date time
        const itemTime = formatDatetime(item.createdAt);

        // Time String
        const timeStr = ` ${itemTime.time} ngày ${itemTime.date}`;

        return (
          <Box key={index} sx={{ width: '100%' }}>
            <TreeItemCollapse
              nodeHandle={nodeHandle}
              item={{ ...item, createdAt: timeStr }}
              recursive={renderTree}
              getChildFolders={getChildFolders}
              isAction={isAction}
              parentAction={parentAction}
              parentData={parentData}
              isSearch={isSearch}
            />
          </Box>
        );
      });
    },
    [formatDatetime, isAction, nodeHandle, isSearch]
  );
  return (
    <Box className="hidden-scrollbar" sx={{ maxHeight: '500px', overflow: 'auto' }}>
      {renderTree(treeData, setRoot, root)}
    </Box>
  );
}
