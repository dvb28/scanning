import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page401() {
  // Router
  const router = useRouter();

  // Goback handle
  const goHome = () => router.push('/auth/login');

  // Render
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h2 className='text-center'>404</h2>
              </div>
              <div className="contant_box_404">
                <h2 className="h2">Phiên đăng nhập hết hạn</h2>
                <p>Bạn không có quyền truy cập tài nguyên này, hãy đăng nhập lại</p>
                <Button variant='contained' onClick={goHome} sx={{mt: '30px'}}>
                  Về trang đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
