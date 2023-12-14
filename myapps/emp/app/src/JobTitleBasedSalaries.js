import { Component } from 'react'
import bulkUploadEmployeeDao  from './emp-bulk-upload-dao'
import { Chart } from "react-google-charts";


export default class JobTitleBasedSalaries extends Component{
    constructor(props){
        super(props)
        this.state = {jobTitleSalary:[]}
    }
    
    componentDidMount(){
        const thenFn = (response)=>{
            console.log('DATAAAAAAAA:',response.data)
            this.setState({jobTitleSalary : response.data});
        };
        const catchFn=(error)=>{
            console.log(error)
        }
        bulkUploadEmployeeDao.jobTitleVsSalary()
        .then(thenFn)
        .catch(catchFn)
    }
    
    render(){
        let eachRowFn = (record)=>{           
            return  <tr><td>{record.job_title}</td><td>{record.total_salary}</td></tr>
        };
        let rows = this.state.jobTitleSalary.map(eachRowFn);

        const data = [
            ['Job Title', 'Salary']
          ];
        for(let e of this.state.jobTitleSalary){
            data.push([e.job_title, e.total_salary])
        }  
        const options = {
            chart: {
                title: "Job Title based Salaries",
                subtitle: "Job Title, Salary",
            },
        };
        return (
            <>
                <div className="container-md p-3">
                    <table className="table table-bordered table-primary">
                        <tr className="bg-warning"><td>Job Title</td><td>Salary</td></tr>
                        {this.state.jobTitleSalary &&  rows}
                    </table>
                </div>
                
                <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
                />
            </>
        
        )
    }
}
