import { Button, Modal } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function ConfirmBox({open,setOpen,Message,onConfirm}) {
  return (
    <>
      
      <Modal show={open} size="md" popup onClose={() => setOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {Message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=> onConfirm()}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


