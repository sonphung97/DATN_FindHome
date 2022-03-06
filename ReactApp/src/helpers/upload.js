import { UploadApi } from './uploadApi';

function uploadMultiImages(data) {
    return new Promise((resolve, reject) => {
        UploadApi.multiImages(data)
            .then(res => { resolve(res.data?.content) })
            .catch(err => { reject(err) })
    })
}


function uploadSingleImage (image) {
    return new Promise((resolve, reject) => {
        UploadApi.multiImages(image)
            .then(res => { resolve(res.data?.content?.imageLinks) })
            .catch(err => { reject(err) })
    })
}

export const UploadHelpers = {
    uploadMultiImages,
    uploadSingleImage
}
