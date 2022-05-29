
export default class ErrorService {

    static receiveMessage(error) {
     return  error?.response?.data?.message
        ? error.response.data.message
        : error.message;
    }
}