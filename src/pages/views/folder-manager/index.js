import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import Main from '@/pages/layout/main';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Viewers from '@/components/viewers';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = { in: PropTypes.bool };

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const folderDatas = {
  id: 'root',
  name: 'Kho thanh oai',
  type: 'folder',
  children: [
    {
      id: '1',
      name: 'UBND',
      type: 'folder',

      children: [
        {
          id: '1-1',
          type: 'pdf',
          link: '/pdf-test.pdf',
          name: '2818',
        },
      ],
    },
    {
      id: '2',
      type: 'folder',
      name: 'HDND',
      children: [
        {
          id: '2-1',
          type: 'pdf',
          name: '2818',
          link: '/pdf-test.pdf',
        },
      ],
    },
    {
      id: '3',
      type: 'folder',
      name: 'VPHDND - UBND',
      children: [
        {
          id: '3-1',
          type: 'pdf',
          link: '/pdf-test.pdf',
          name: '2819',
        },
      ],
    },
  ],
};

export default function FolderManager() {
  const [crSlType, setCrSlType] = React.useState('folder');

  const [crFileData, setCrFileData] = React.useState(null);

  const [crFolderData, setCrFolderData] = React.useState(folderDatas);


  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={(e) => {
        e.preventDefault();
        // Nếu có children thì là folder
        if (nodes.type === 'folder') {
          setCrSlType('folder');
          setCrFolderData(nodes);
        } else {
          setCrSlType('pdf');
          setCrFileData(nodes.link);
        }
      }}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );

  return (
    <Main title="Quản lý thư mục">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Card sx={{ minWidth: 275, width: '100%' }}>
            <CardContent>
              <Typography sx={{ fontSize: 15, mb: 1.5 }} color="text.secondary" gutterBottom>
                Quản lý cây thư mục (Tree View)
              </Typography>
              <TreeView
                aria-label="customized"
                defaultExpanded={['root']}
                defaultSelected={'root'}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
              >
                {renderTree(folderDatas)}
              </TreeView>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Card sx={{ width: '100%', maxHeight: '87vh', overflow: 'auto' }}>
            <CardContent sx={{ scrollbarWidth: 0 }}>
              {crSlType === 'folder' ? (
                <>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Thông tin thư mục
                  </Typography>
                  <Typography variant="h5" component="div">
                    {crFolderData ? crFolderData.name : 'Không có thông tin'}
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                  </svg>
                  <div className="my-1">
                    <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                      Thư mục con: 10 thư mục
                    </Typography>
                    <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                      Tổng số file: 1000 file
                    </Typography>
                    <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                      Ngày tạo: 20/8/2023
                    </Typography>
                    <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                      Người tạo: Admin
                    </Typography>
                  </div>
                  <Typography variant="body2"> Mô tả: Không có mô tả </Typography>
                </>
              ) : (
                crFileData && <Viewers fileUrl={crFileData} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Main>
  );
}
