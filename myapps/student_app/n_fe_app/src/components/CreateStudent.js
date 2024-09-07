import axios from "axios";
import { /*useEffect,*/ useState } from "react";

function CreateStudent(){
    const [student, setStudent] = useState({usn: '1005',
        name: 'Dra',
        sem: 1,
        branch: 'CS',
        cgpa: 7});

    const onBoxChange = function(event){
        let stud = { ... student };        
        stud[event.target.id] = event.target.value;
        setStudent(stud);
    }

    const saveStudent = async() => {
        if(!window.confirm('Are you sure to save?')) return;
        const network = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await network.post('/students', student);
        const data = response.data;
        setStudent(data);
        //
        alert('Student Created Successfully');
    }

    
    return(
        <>
        <div className="container">
            <form>    
                <div><a href={`/student/list`} className="btn btn-secondary">Go Back</a></div>
                <h1 className="h3 mb-3 fw-normal">Create Student</h1>
                <div className="form-floating">
                    <input type="text" 
                            className="form-control" 
                            id="usn" 
                            placeholder=""
                            value={student.usn}
                            onChange={onBoxChange}
                            />
                    <label htmlFor="usn">USN #</label>
                </div>
                <div className="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder=""
                        value={student.name}
                        onChange={onBoxChange}/>
                    <label htmlFor="name">Your Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="sem" 
                        placeholder=""
                        value={student.sem}
                        onChange={onBoxChange}/>
                    <label htmlFor="sem">Semester#</label>
                </div>
                <div className="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="branch" 
                        placeholder=""                                
                        value={student.branch}
                        onChange={onBoxChange}/>
                    <label htmlFor="branch">Branch</label>
                </div>
                <div className="form-floating">
                    <input type="text" 
                        className="form-control" 
                        id="cgpa" 
                        placeholder=""                                
                        value={student.cgpa}
                        onChange={onBoxChange}/>
                    <label htmlFor="cgpa">CGPA</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary"
                    type="button"
                    onClick={saveStudent}>Create</button>
            </form>
        </div> 
    </>
    );
}

export default CreateStudent;