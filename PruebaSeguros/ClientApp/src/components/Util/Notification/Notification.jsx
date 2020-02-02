import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    positionClass: 'toast-top-right',
    showDuration: 1000,
    hideDuration: 1000,
    timeOut: 4000
};

export const Notification = toastr;