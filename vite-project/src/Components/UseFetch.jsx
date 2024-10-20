import { useState,useEffect } from "react";

function UseFetch(url){
    const[data,setData] = useState([]);
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(true);

useEffect(()=>{

    const fetchData = async ()=>{
        try{
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
           
            setData( result);
        }
        catch(err){
            setError(err);
        }
        finally{
            setLoading(false);
        }

    }
    fetchData();


},[url]
)

return {data,error,loading}




}


export default UseFetch;

