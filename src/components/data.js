import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Data() {
        const [posts, setPosts]= useState([]);
    
        const getPosts=async()=>{
            const api='https://jsonplaceholder.typicode.com/posts'
          const response= await axios.get(api);
                setPosts(response.data);
            
            
        }

        useEffect(()=>{
           
            getPosts();
        },[]);




        
}