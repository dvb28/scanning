import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toasts = {
     default: (log) => {
          toast(log);
     },
     promise: (promiseState, validateCallback = false, handleCallback = false, delayTime = 2000) => {
          const resolveAfter3Sec = new Promise((resolve, rejected) => setTimeout(() => {
               if(validateCallback) {
                    validateCallback().then(res => {
                         if(res === true) {
                              resolve();
                              setTimeout(() => {
                                   if(handleCallback) {
                                        handleCallback();
                                   }
                              }, delayTime);
                         } else {
                              rejected();   
                         }
                    }).catch(error => {
                         rejected();
                    });
               } else {
                    rejected();
               }
          }, delayTime));
          toast.promise(resolveAfter3Sec, promiseState);
     },
     warn: (log) => {
          toast.warn(log);
     },
     success: (log) => {
          toast.success(log);
     },
     error: (log) => {
          toast.error(log);
     },
     info: (log) => {
          toast.info(log);
     }
}
export default Toasts;