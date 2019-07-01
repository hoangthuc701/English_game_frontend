export const  read = (userId, token)=>{
    return fetch(`http://localhost:8080/user/${userId}`,{
        method:"GET",
        headers:{
            Accepted: "application/json",
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(respone=>{
        return respone.json()
    })
    .catch(err=>console.log(err));
}
export const getlist = () =>{
    return fetch('http://localhost:8080/users',{
        method:"GET",
        headers:{
            Accepted: 'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(respone=>{
        return respone.json();
    })
    .catch(err=>console.log(err));
}