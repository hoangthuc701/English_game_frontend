export const  read = (userId, token)=>{
    return fetch(`https://englishgamebackend.herokuapp.com/user/${userId}`,{
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
    return fetch('https://englishgamebackend.herokuapp.com/users',{
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