import Main from '@/pages/layout/main';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dynamic from 'next/dynamic';
import ScanningContext from '@/context/context';
import getStatistical from '@/handlers/getStatistical';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
  // Context
  const scanningCtx = React.useContext(ScanningContext);

  // Statis State
  const statisData = scanningCtx.statis;

  // Charts Data
  const areaChartConf = {
    series: [
      {
        name: 'Thư mục',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Tài liệu',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  };

  const columnCharConf = {
    series: [
      {
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3],
      },
    ],
    options: {
      chart: {
        height: 365,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false, // Ẩn các nhãn trục x
        },
      },
      grid: {
        show: false, // Ẩn các dòng kẻ
      },
    },
  };

  // Use Effect
  React.useEffect(() => {
    // Refresh Statis
    const refreshStatis = async () => {
      // Statistical Data
      const data = await getStatistical();

      // Refresh
      scanningCtx.setStatisticalData(data);
    }

    // Call
    refreshStatis();
  }, []);

  // Render
  return (
    <Main title="Thống kê" backgroundColor="rgb(250, 250, 251)">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography sx={{ fontSize: '17px' }}>Tổng quan</Typography>
          <Grid container spacing={2}>
            {statisData && Object.keys(statisData).map((key) => {
              return (
                <Grid item xs={12} sm={12} md={6} lg={3} key={statisData[key].title}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid rgb(230, 235, 241)',
                      borderRadius: '4px',
                      padding: '18px',
                      backgroundColor: 'white',
                      gap: '7px',
                    }}
                  >
                    <Typography sx={{ fontSize: '13px', color: 'rgb(140, 140, 140)' }}>
                      {statisData[key].title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Typography variant="h5" sx={{ fontWeight: '600' }}>
                        {statisData[key].count} 
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor:
                            statisData[key]?.statis?.type === 'increase'
                              ? 'rgb(24, 144, 255)'
                              : 'rgb(250, 173, 20)',
                          borderRadius: '3px',
                          px: '5px',
                          py: '1px',
                          gap: '5px',
                        }}
                      >
                        <Box sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                          {statisData[key]?.statis?.type === 'increase' ? (
                            <TrendingUpIcon fontSize="12px" />
                          ) : (
                            <TrendingDownIcon fontSize="12px" />
                          )}
                        </Box>
                        <Typography
                          variant="p"
                          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
                        >
                          {statisData[key]?.statis?.percent}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: '10px', display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '12px', color: 'rgb(140, 140, 140)' }}>
                        Đã tải lên
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: 'rgb(140, 140, 140)',
                          mx: '3px',
                          color:
                            statisData[key]?.statis?.type === 'increase'
                              ? 'rgb(24, 144, 255)'
                              : 'rgb(250, 173, 20)',
                        }}
                      >
                        {statisData[key].monthMade}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: 'rgb(140, 140, 140)' }}>
                        {statisData[key]?.type} trong tháng này
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography sx={{ fontSize: '17px' }}>Thống kê</Typography>
          <Grid container gap={3}>
            <Grid item xs={7.95}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgb(230, 235, 241)',
                  borderRadius: '4px',
                  padding: '18px',
                  backgroundColor: 'white',
                  gap: '7px',
                }}
              >
                <ApexChart
                  options={areaChartConf.options}
                  series={areaChartConf.series}
                  type="area"
                  height={450}
                />
              </Box>
            </Grid>
            <Grid item xs={3.8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgb(230, 235, 241)',
                  borderRadius: '4px',
                  padding: '18px',
                  backgroundColor: 'white',
                  height: '100%',
                  gap: '7px'
                }}
              >
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <Typography sx={{ fontSize: '13px', color: 'rgb(140, 140, 140)'}}>
                    Thống kê tuần này
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: '600'}}>
                    100,000
                  </Typography>
                </Box>
                <ApexChart
                  options={columnCharConf.options}
                  series={columnCharConf.series}
                  type="bar"
                  height={365}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Main>
  );
}
