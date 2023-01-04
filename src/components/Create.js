import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";
// import {useForm} from 'react-hook-form';
import { Link } from "react-router-dom";
import { useNavigate,useParams } from 'react-router-dom';
import { lazy,Suspense } from 'react';

export default function CreatePost(){

   const {id}=useParams();


    const [posts, setPosts]= useState([]);

   const [values,setValue]=useState({
    id:"",
    title:"",
    body:"",
   })
   
    const [submitted,setSubmitted]=useState(false);
    useEffect(()=>{
       
    },[])
    useEffect(()=>{
       
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then((response) => response.json())
        // .then((json) => console.log(json));
        getPosts();
       

    },[]);

    const getPosts=()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then(function(response){
            console.log(response.data);
            setPosts(response.data);
            setValue(response.data);
        });
        
    }

    const api = axios.create({
        baseURL: `https://jsonplaceholder.typicode.com/posts`
      })
      

    //   const handleRowAdd = async (newData, resolve) => {
    //     //validation
    //     let errorList = []
    //     if(!newData.title ){
    //         errorList.title="Title is empty";
    //     }
    //     if(!newData.body){
    //         errorList.body="Body is empty";
    //     }
        
    
    //     if(errorList.length < 1){ //no error
    //         const post = { title: title, body: body };
    //         axios.post('https://jsonplaceholder.typicode.com/posts', {
    //          title,
    //          body
            
    //     })
    //     setPosts([post, ...posts]);
    //     }else{
    //       setFormErrors(errorList)
    //       setIsSubmit(true)
    //       resolve()
    //     }
    
        
    //   }
    





    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setPosts({...posts,[name]:value});

    }

    const handleTitleInput=(event)=>{
        // const txt=values.title;
        // const len =txt.trim().length;
      
        // if (len < 1)
        // {  
        //       alert("Invalid Text");
        // }
        // setValue("#"+validator.trim(event)+"#")
        setValue({...values,title:event.target.value})
    }
    const handleBodyInput=(event)=>{
        setValue({...values,body:event.target.value})
    }

    const [titles, setTitle] = useState('');
    const [bodys, setBody] = useState('');

    const handleSubmit=(event)=>{
        event.preventDefault();
        // if(titles.length<1||bodys.length<1){
        //     setSubmitted(true);
        // }
        // else{
        //     setSubmitted(false);
        // } 
        setSubmitted(true);
         
    };
   

   // const navigate = useNavigate();
   
   
    
 
    const addPost = async () => {
        // const txt=values.title;
        // const len =txt.trim().length;
        
        // const bod=values.body;
        // const bodylen=bod.length;
        // const titlelen =txt.length;
        const post = { title: titles, body: bodys };
        const errors={};
       

        if (titles.trim().length<1 || bodys.trim().length<1)
        {
            setSubmitted(true);
             // alert("Invalid Text");
        }
        else{
            axios.post('https://jsonplaceholder.typicode.com/posts', {
                titles,
                bodys
               
           })
          
         
           setPosts([post, ...posts]);
           
        }
       
      };
   
     


    //   const validate=(values)=>{
    //     const errors={};
        
        // switch (name) {
        //     case 'title': 
        //       errors.title = 
        //         values.length < 5
        //           ? 'Full Name must be 5 characters long!'
        //           : '';
        //       break;
           
        //     case 'body': 
        //       errors.body = 
        //         values.length < 8
        //           ? 'Password must be 8 characters long!'
        //           : '';
        //       break;
        //     default:
        //       break;
        //   }
    //     if(!values.body){
    //         errors.body="Body is empty";
    //     }else{
    //         errors.body="";
    //     }
    //     if(!values.title){
    //         errors.title="Title is empty";
    //     }
        
       
    //     return errors;
    //   };

    return(
        <div class="wrap">
        <h1>Adding Posts</h1>
       <hr></hr>
        <br></br>
        <div className=" boxs panel-body">
   
        <form className="create-form" onSubmit={handleSubmit}>
                
                <label className='left'>Title</label>
                {/* <input placeholder='title' className="form-control" {...register("title",{required:true})} onChange={(e) => setTitle(e.target.value)} />
                {errors.title &&<span>This field is required</span>} */}

                <input  name="title" className="form-control"   value={titles.title} onChange={(e) => setTitle(e.target.value)}  />
               {/* <p className='error'>{formErrors.title}</p> */}
               {submitted && titles.trim().length<1 ?<p className='error'>Please enter a title</p>:null}
           <br></br>
            
                <label className='left'>Body</label>
                {/* <input placeholder='body' className="form-control" {...register("body",{required:true})} onChange={(e) => setBody(e.target.value)} />
                {errors.body &&<span>This field is required</span>} */}
                <input name="body" className="form-control"  value={bodys.body} onChange={(e) => setBody(e.target.value)} />
                {/* <p className='error'>{formErrors.body}</p> */}
                {submitted && bodys.trim().length<1  ?<p className='error'>Please enter a body</p>:null}
                <br></br>

                <button onClick={addPost} className="btn btn-primary btn-sm"> Add Post </button>
        </form>
<br></br>
       
        <hr></hr>
        
</div>
       
        <table class="table table-bordered table-striped" >
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Body</th>
                    
                    
                    </tr>
                </thead>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                 <tbody>
                 {posts.map((post,key)=>{
                    return(
                        <tr key={key}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>{post.body}</td>

                          </tr>
                    );
                 }
                       
                    
                    )}      
                 </tbody>
                      {/* </Suspense> */}
                  
                                  
            </table>
            
        </div>
    )
}


// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useState,useEffect } from "react";
// import {useParams} from 'react-router-dom';

// export default function CreatePost() {

//     const [posts,setPosts]=useState([]);
//     // const [formValues, setFormValues] = 
//     // useState({ title: '', body:''})

//     //const {id}=useParams();
     
//     //   this.state = {title: '', body:''};
//     //   this.handleChange = this.handleChange.bind(this);
//     //   this.handleSubmit = this.handleSubmit.bind(this);
    
//     useEffect(()=>{
//         // fetch('https://jsonplaceholder.typicode.com/posts')
//         // .then(response=>response.json())
//         // .then(res=>setUsers(res))
        
//         getPost();
//     },[]);
  
//     const getPost=()=>{
      
//         const addPost = async () => {
//             const post = { title: "New Post", body: "new" };
//             await axios.post('https://jsonplaceholder.typicode.com/posts', post);
//             setPosts([post, ...posts]);
//           };
        
//     }

//     const addPost = async () => {
//         const post = { title: "New Post", body: "new" };
//         await axios.post('https://jsonplaceholder.typicode.com/posts', post);
//         setPosts([post, ...posts]);
//       };

//       const handleChange=(event)=>{
//         const name=event.target.name;
//         const value=event.target.value;
//         setPosts(values=>({...values,[name]:value}));
//       }

//  const handleSubmit=(event)=>{
//       event.preventDefault();
   
//       let formData = new FormData();
//       formData.append('title', posts.title)
//       formData.append('body', posts.body)
   
//       axios.post('https://jsonplaceholder.typicode.com/posts',formData)
          
//       .then(function (response) {
//           //handle success
//           console.log(response)
//           alert('New post Successfully Added.');  
//       })
//       .catch(function (response) {
//           //handle error
//           console.log(response)
//       });
   
//     } 


  
//       return (
//           <div className="container">
//               <h1 className="page-header text-center">Add a post here</h1>
//               <Link to="/" className="home btn btn-primary btn-xs">Home</Link>
//               <button onClick={addPost} className="btn btn-primary btn-sm">
//           Add Post
//         </button>
//               <div className="col-md-12">
             
//               <div className="box panel panel-primary">
//               <div className='paragraph'> <p className='para'>*Create a post </p></div>
//               <br/>
//                   <div className=" boxs panel-body">
//                   <form onSubmit={this.handleSubmit}>
//                   <label>Title</label>
//                   <input type="textarea" name="title" className="form-control" value={posts.title} onChange={handleChange} />
//                   <br/>

//                   <label>Body</label>
//                   <input type="textarea" name="body" className="form-control" value={posts.body} onChange={handleChange} />
//                   <br/>
                 
//                   <br/>
//                   <input type="submit" className="btn btn-primary btn-block" value="Post" />
//               </form>
//                   </div>
//               </div>
//               </div>
//           </div>
//       );
  
// }
