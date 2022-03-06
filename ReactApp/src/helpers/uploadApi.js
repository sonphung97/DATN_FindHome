
import {
    sendRequest
} from './requestHelper';

async function multiImages(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/upload/multi-images`,
        method: 'POST',
        data
    }, false, true)
}

export const UploadApi = {
    multiImages
};