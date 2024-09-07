import axios from "axios";
import { useEffect, useState } from "react";

function StudentList(){
    const [students, setStudents] = useState([{id:0, cgpa:7}]);
    const readAll = async() => {
        const network = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await network.get('/students');
        const data = response.data;
        setStudents(data);
    }
    useEffect(()=>{        readAll();     }, []);
    const onDelete = async(id) => {
        const network = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await network.delete(`/students/${id}`);
        const data = response.data;
        alert('Student deleted successfully.');
        readAll();
    }
    return(
        <div>
            <div className="container">
                    <h1 className="h3 mb-3 fw-normal">List of Students</h1>
                    <div><a href={`/student/create`} className="btn btn-primary">Add Student</a></div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>USN#</th>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>Branch</th>
                                <th>CGPA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map(( e ) => {
                                    return (
                                        <tr key={e.id}>
                                            <td>{e.usn}</td>
                                            <td>{e.name}</td>
                                            <td>{e.sem}</td>
                                            <td>{e.branch}</td>
                                            <td>{e.cgpa}</td>
                                            <td>
                                                <a href={`/student/edit/${e.id}`}
                                                    className="btn btn-warning">Edit</a>&nbsp;
                                                <button type="button"
                                                    onClick={() => onDelete(e.id)}
                                                    className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>);
                                    }/* end each mapper */) /* end map */
                                
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default StudentList;