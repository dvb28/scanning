import React, { useState } from 'react';
import { Modal, Button} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi2';

export default function QuestionsModels({message, handle = false}) {
  const [modal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <Button onClick={e => setShowModal(true)}>Toggle modal</Button>
      <Modal show={modal} size="md" popup={true} onClose={e => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={e => {
                if(handle !== false) {
                  handle();
                }
              }}>
                Đồng ý
              </Button>
              <Button color="gray" onClick={e => setShowModal(false)}>
                Thoát
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
