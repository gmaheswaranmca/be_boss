import axios from "axios";
import { useEffect, useState } from "react";

function HelloFcApi(){
    const [greet, setGreet] = useState('Loading...');
    const readHello = async () => {
        const network = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await network.get('/hello');
        const data = response.data;
        setGreet(data);
    }
    useEffect(()=>{
        readHello();
    }, [])
    return(
        <div>
            FC:{greet}
        </div>
    );
}

export default HelloFcApi;