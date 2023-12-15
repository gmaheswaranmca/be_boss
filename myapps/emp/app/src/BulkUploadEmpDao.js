import network from "./network";
class BulkUploadEmployeeDao{
    uploadCsv = (file, onFileUploading) => {
        let formData = new FormData();

        formData.append("file", file);
        
        console.log('before sending to server, body is',formData)
        let configExtra = {
            headers: {
                "Content-Type": "multipart/form-data"
              }
        }
        return network.post('/upload-emp-csv', formData,configExtra, onFileUploading);
    }
    jobTitleVsSalary = () => {
        return network.get('/job-title-vs-salary');
    }
}
let bulkUploadEmployeeDao = new BulkUploadEmployeeDao()
export default bulkUploadEmployeeDao;