import { Component } from 'react'
import bulkUploadEmployeeDao  from './BulkUploadEmpDao'

export default class BulkUploadEmployee extends Component{
    constructor(props){
        super(props)
        this.state = {currentFile:null, progressValue: 0}
    }
    onFileSelecected = (e)=>{
        const { files } = e.target;
        console.log(files)
        console.log(files[0])
        this.setState({currentFile: files[0]});
    }
    onUpload = (e) => {
        let onFileUploading = (e) => {
            this.setState({progressValue: e.loaded})
        } 
        let thenFn = (response) => {
            console.log(response.data.message);
            alert('uploaded successfully')
          };
        let catchFn = (error) => {
            console.log(error)
        }
        bulkUploadEmployeeDao
            .uploadCsv(this.state.currentFile, onFileUploading)
            .then(thenFn)
            .catch(catchFn);
    }
    render(){
        return (
            <>
                <div className="container-md p-3">
                    <div className="card" style={{ width: "600px" }}>
        
                        <div className="card-body">
                            <h5 className="card-title">Bulk Upload Employee List</h5>
                            <div className="mb-3">
                                <label for="formFile" className="form-label">Select a file to upload</label>
                                <input className="form-control" type="file" id="formFile" onChange={this.onFileSelecected}/>
                            </div>
                            <input type="button" className="btn btn-success" value="Upload!"
                                onClick={this.onUpload}/>
                                <div><div 
                                style={{display:'inline-block',
                                width:'100px',width:'100px',
                                backgroundColor:'orange'}}>{this.state.progressValue}</div></div>
                        </div>
                    </div>
                </div>
            </>
        
        )
    }
}
