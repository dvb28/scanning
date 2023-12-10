import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toasts = {
     default: async (log) => {
          toast(log);
     },
     promise: async (toastConfig) => {
          // Running Handle
          const runSuccess = (toastConfig, resolve, data = null) => {
               toastConfig.hasOwnProperty('success') && typeof toastConfig.success === 'function'
               && toastConfig.success(data);
               resolve();
          }

          // Running Error
          const runError = (toastConfig, rejected, data = null) => {
               toastConfig.hasOwnProperty('error') && typeof toastConfig.error === 'function'
               && toastConfig.error(data);
               rejected();
          }

          // Create Promise
          const resolveAfter3Sec = new Promise((resolve, rejected) => setTimeout(() => {
               // Check
               if(toastConfig.hasOwnProperty('validate') && typeof toastConfig.validate === 'function') {
                    // Validate
                    toastConfig.validate().then(res => {
                         // Check and Run success handle or error handle
                         res ? runSuccess(toastConfig, resolve, res) : runError(toastConfig, rejected, res);
                    }).catch((err) => {
                         // Check and running error handle
                         runError(toastConfig, rejected, err);
                    });
               } else {
                    // Check and Run Handle
                    runSuccess(toastConfig, resolve);
               }
          }, toastConfig.delayTime ? toastConfig.delayTime : 2000));

          // Run Toast
          toast.promise(resolveAfter3Sec, toastConfig.promiseState);
     },
     warn: async (log) => {
          toast.warn(log);
     },
     success: async (log) => {
          toast.success(log);
     },
     error: async (log) => {
          toast.error(log);
     },
     info: async (log) => {
          toast.info(log);
     }
}
export default Toasts;