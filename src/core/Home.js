import React,{Component} from 'react'
import {isAuthenticate} from '../auth/index'
import socketIOClient from "socket.io-client";


class Home extends Component{
    constructor(){
        super();
        this.state = {
            body:"",
            posts:[],
            error:""
        }
    }
    getData = () =>{
        return fetch('https://englishgamebackend.herokuapp.com/',{
            method:"GET",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json'
            }
        })
        .then(respone=>{
            return respone.json();
        })
        .catch(err=>console.log(err));
    }
    getUpdate =()=>{
        this.getData()
        .then((data)=>{
            if (!data.err){
                this.setState({
                    posts:data.posts
                })
            }
        })
        .catch(err=>console.log(err));
        this.setState({
            body:"",
            error:""
        })
    }
    componentDidMount(){
       const socket = socketIOClient('https://englishgamebackend.herokuapp.com/');
       socket.on('refresh',()=>{
            this.getUpdate();
       })
       this.getUpdate();
    }
    handleChange = name => event =>{
        this.setState({
            [name]:event.target.value,
            error:""
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const token = isAuthenticate().token;
        if (!token) 
        {
            this.setState({
                error:"Sign in to continue."
            })
            return;
        }
        const userId = isAuthenticate().user._id;      
        const {body} = this.state; 
        const post = {body}
        fetch(`https://englishgamebackend.herokuapp.com/post/new/${userId}`,{
            method:"POST",
            headers:{
                Accepted: "application/json",
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(post)
        })
        .then(respone=>{
            return respone.json();
        })
        .then(data=>{
            if (data.error){
                this.setState({
                    error: data.error
                })
            }
            else
            {
                //console.log("Create success.")
            }
        })
    }
    renderPosts = (posts) =>{
        return (
            <>
            <div>
                {posts.map((post,id)=>(
                    <div className="card mt-5">
                        <h5 class="card-header">{post.postedBy.name}</h5>
                        <div class="card-body">
                            <h5 class="card-title">{post.body}</h5>
                            <p>Create at: {new Date(post.created).toDateString()} </p>
                        </div>
                            
                    </div>
                ))}
            </div>
            </>
        );
    }
    render(){
        const {body,posts,error}  = this.state;
        return (
            <div classNam="container">
                <h1> Connecting Words Game </h1>
                <br/>
                <p>The rules are very simple: you just need to get the last letter of the word that was posted as the first letter for your word.</p>
                <p>Please start, the first word will be: <br/>

                English: "English". ("H"). <br/>

                Let's play ^^</p>


                <form>
                <div className="alert alert-danger" style={{display:error?"":"none"}}>
                    {
                        error
                    }
                </div>
                <div className="form-group">
                        <input className="form-control" type="text" onChange={this.handleChange("body")} value={body}></input>
                        <br/>
                        <button className="btn btn-primary btn-raised" onClick={this.handleSubmit}> Post</button>
                        
                    </div>
                </form>
                {this.renderPosts(posts)}

            </div>
        );
    }
}

export default Home;