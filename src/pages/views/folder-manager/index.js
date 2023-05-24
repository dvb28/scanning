import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Main from '@/pages/layout/main';
import { Typography } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const data = {
  id: 'root',
  name: 'Kho thanh oai',
  children: [
    {
      id: '1',
      name: 'UBND',
      children: [
        {
          id: '1-1',
          name: '2818'
        }
      ]
    },
    {
      id: '2',
      name: 'HDND',
      children: [
        {
          id: '2-1',
          name: '2818'
        }
      ]
    },
    {
      id: '3',
      name: 'VPHDND - UBND',
      children: [
        {
          id: '3-1',
          name: '2818'
        }
      ]
    },
  ],
};

export default function FolderManager() {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} endIcon={<PictureAsPdfOutlinedIcon/>}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Main>
      <Typography sx={{color: 'royalblue', marginBottom: '10px'}}>
          Quản lý thư mục
      </Typography>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: '60vh', border: '1px solid rgba(128, 128, 128, 0.4)', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {renderTree(data)}
      </TreeView>
    </Main>
  );
}