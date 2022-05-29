import imageCompression from 'browser-image-compression';

 

const config = {
    maxSizeMB: 0.02,
    maxWidthOrHeight: 1920,
    useWebWorker: true
};




export const compressImage = async (file) => {
 return  await imageCompression(file,config);
}