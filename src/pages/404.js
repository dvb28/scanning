import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page404() {
  // Router
  const router = useRouter();

  // Goback handle
  const goBack = () => router.back ? router.back() : router.push('/views/dashboard');;

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
                <h2 className="h2">Trang này không tồn tại</h2>
                <p>Đường dẫn bạn đã truy cập không tồn tại, vui lòng thử lại</p>
                <Button variant='contained' onClick={goBack} sx={{mt: '30px'}}>
                  Về trang trước
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
