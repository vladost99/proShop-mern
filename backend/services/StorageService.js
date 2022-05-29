const firebase = require('../../firebase');
const { getStorage, ref, uploadString, getDownloadURL, deleteObject } = require("firebase/storage");
const storage = getStorage();

class StorageService {
   refStorage = 'mern_proshop/rooms';
   
   async upload(id, image) {

        let ref = this.createRefStorage(id);
        await uploadString(ref, image, 'data_url');
        let res = await getDownloadURL(ref).then(url => url);
        return res;
   }

   async delete(id, ref) {
        let refStore = ref || this.createRefStorage(id);
        await deleteObject(refStore);
   }

   createRefStorage(id) {
       return ref(storage, `${this.refStorage}/${id}`);
   }
}

module.exports = new StorageService();