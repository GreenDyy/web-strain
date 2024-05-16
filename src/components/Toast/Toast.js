import React from 'react';

import { toast } from 'react-toastify';

const toastSuccess = (message, position) => {
    toast.success(message, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

const toastError = (message, position) => {
    toast.error(message, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

const toastWarning = (message, position) => {
    toast.warning(message, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

export {
    toastSuccess,
    toastError,
    toastWarning,
}