import React, { useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Main from '@/pages/layout/main';
import Toasts from '@/utils/toasts';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  Radio,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Viewers from '@/components/viewers';

export default function Scan() {
  // Máy scan đã chọn
  const [scanner, setScanner] = useState('');

  // Hàm khi thay đổi máy scan
  const handleChangeScanner = (event) => {
    setScanner(event.target.value);
  };

  // Thay đổi độ phân giải của bản quét
  const [DPI, setDPI] = useState(300);

  // Hàm khi thay đổi máy scan
  const handleChangeDPI = (event) => {
    setDPI(event.target.value);
  };

  // Thay đổi cầu hình prefix tên file
  const [prefixName, setPrefixName] = useState('');

  // Hàm khi thay đổi máy scan
  const handleChangePrefixName = (event) => {
    setPrefixName(event.target.value);
  };

  // Hàm khi thay đổi kiểu scan
  const [handleScanType, setHandleScanType] = useState(false);

  // Kiểm tra kết nối của máy scan
  const [scannerCnt, setScannerCnt] = useState(false);

  // Thay đổi trạng thái kết nối của máy quét
  const changeScannerCnt = (value) => {
    setScannerCnt(value);
  };
  // Thay đổi kiểu quét
  const handleChangeScanType = (value) => {
    setHandleScanType(value);
  };

  // Try Connnect
  const tryingConnectScanner = (e) => {
    e.preventDefault();
    Toasts.promise({
      pending: 'Đang thử kết nối với máy quét',
      success: 'Kết nối với máy quét thành công 👌',
      error: 'Kết nối với máy quét thất bại 🤯',
    });
  }

  // Quét tài liệu
  const scanHandle = (e) => {
    e.preventDefault();
    Toasts.promise({
      pending: 'Đang quét tài liệu',
      success: 'Quét tài liệu thành công 👌',
      error: 'Quét tài liệu thất bại 🤯',
    });
  };
  return (
    <Main title='Quét tài liệu'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6} sx={{ height: '86.6vh', overflow: 'auto' }}>
          <Viewers fileUrl="/pdf-test.pdf" />
        </Grid>
        <Grid item xs={12} md={12} lg={6} >
          <Typography
            sx={{ textTransform: 'uppercase', color: 'royalblue', marginBottom: '10px'}}
            variant="h6"
            component="h6"
          >
            Cài đặt máy quét
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl size="small" fullWidth sx={{ marginBottom: '25px' }}>
                <InputLabel id="scanner-machine-label">Chọn máy quét</InputLabel>
                <Select
                  labelId="scanner-machine-label"
                  id="scanner-machine"
                  value={scanner}
                  label="Chọn máy quét"
                  onChange={handleChangeScanner}
                >
                  <MenuItem value={10}>Chọn máy quét</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth sx={{ marginBottom: '25px' }}>
                <InputLabel id="scanner-dpi-label">Độ phân giải (DPI)</InputLabel>
                <Select
                  labelId="scanner-dpi-label"
                  id="scanner-dpi"
                  value={DPI}
                  label="Chọn độ phân giải"
                  onChange={handleChangeDPI}
                >
                  <MenuItem value={300}>300</MenuItem>
                </Select>
              </FormControl>
              <Grid container spacing={2}>
                <Grid item lg={8} md={8} xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="scanner-prefix-name"
                    placeholder="VD: HS.20.21.22.X"
                    label="Cấu hình tên file (Prefix)"
                    variant="outlined"
                    onChange={handleChangePrefixName}
                  />
                </Grid>
                <Grid item lg={4} md={4} xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    sx={{ marginBottom: '25px' }}
                    type="number"
                    id="scanner-suffix-number"
                    label="Tăng"
                    variant="outlined"
                    onChange={handleChangePrefixName}
                  />
                </Grid>
              </Grid>
              <FormControl size="small" fullWidth sx={{ marginBottom: '25px' }}>
                <InputLabel id="scanner-color-label">Màu quét</InputLabel>
                <Select
                  labelId="scanner-color-label"
                  id="scanner-color"
                  value={scanner}
                  label="Chọn máy quét"
                  onChange={handleChangeScanner}
                >
                  <MenuItem value="backandwhite">Đen trắng</MenuItem>
                  <MenuItem value="gray">Xám</MenuItem>
                  <MenuItem value="color">Màu</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth sx={{ marginBottom: '25px' }}>
                <InputLabel id="scanner-page-label">Số trang muốn quét</InputLabel>
                <Select
                  labelId="scanner-page-label"
                  id="scanner-page"
                  value={scanner}
                  label="Số trang muốn quét"
                  onChange={handleChangeScanner}
                >
                  <MenuItem value="backandwhite">Quét một trang</MenuItem>
                  <MenuItem value="gray">Quét nhiều trang</MenuItem>
                </Select>
              </FormControl>
              {scannerCnt ? (
                <Button variant="contained" onClick={scanHandle}>
                  Quét tài liệu
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={tryingConnectScanner}
                >
                  Chưa kết nối máy scan
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl>
                <FormLabel sx={{color: 'royalblue'}} id="radio-group-change-scan-type">Cấu hình quét</FormLabel>
                <RadioGroup
                  row
                  defaultValue="handle-scanning"
                  aria-labelledby="radio-group-change-scan-type"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    onChange={(e) => handleChangeScanType(true)}
                    id="auto-scanning"
                    value="auto-scanning"
                    control={<Radio size="small"/>}
                    label="Quét tự động"
                  />
                  <FormControlLabel
                    onChange={(e) => handleChangeScanType(false)}
                    id="handle-scanning"
                    value="handle-scanning"
                    control={<Radio size="small"/>}
                    label="Quét thủ công"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <div style={{ color: 'royalblue', margin: '10px 0' }}>
                  Cấu hình quét tự động
                </div>
                <div
                  style={{
                    border: '1px solid rgba(128, 128, 128, 0.4)',
                    borderRadius: '6px',
                    padding: '15px 12px',
                    backgroundColor: handleScanType ? 'white' : 'rgba(128, 128, 128, 0.1)'
                  }}
                >
                  <div>
                    <TextField
                      size="small"
                      id="after-scan-delay"
                      fullWidth
                      label="Thời gian chờ sau quét (s)"
                      variant="outlined"
                      disabled={handleScanType ? false : true}
                    />
                  </div>
                  <div>
                    <div className="flex flex-col gap-4" id="radio">
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            id="auto-scanning"
                            value="female"
                            control={<Radio size="small" disabled={!handleScanType} id="one-pages-scan" />}
                            label="Quét một mặt"
                          />
                          <FormControlLabel
                            id="handle-scanning"
                            value="male"
                            control={<Radio size="small" disabled={!handleScanType} id="one-multiple-scan" />}
                            label="Quét hai mặt"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Main>
  );
}
