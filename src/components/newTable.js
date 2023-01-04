import {useTableInstance,getCoreRowModel} from '@tanstack/react-table';
import { createTable } from '@tanstack/react-table';
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Data from './data';

// const table=createTable();
// console.log(table);

export default function Table(){

    const [posts, setPosts]= useState([]);
    
    useEffect(()=>{
       
        getPosts();
    },[]);
    
    const getPosts=async()=>{
        const api='https://jsonplaceholder.typicode.com/posts'
      const response= await axios.get(api);
            setPosts(response.data);
        console.log(response.data);
        
    }


return(<div>Basic Table</div>)

}