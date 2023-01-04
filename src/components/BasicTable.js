import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";
// import MOCK_DATA from '../MOCK_DATA.json'
// import {COLUMNS} from '../components/columns'
import { useTable } from "react-table/dist/react-table.development";
import { useMemo } from "react";


const successMessage={
   color:"#D8000C",
  backgroundColor: "#FFBABA",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "3px 3px 3px 3px",
}


export const BasicTable=()=>{

    const [posts, setPosts]= useState([]);
    const [pos, setPos]= useState([]);

    const getPos=async()=>{
      const api='https://jsonplaceholder.typicode.com/pos'
    const response= await axios.get(api).catch(err=>console.log(err));
    if(response){
    const posts=response.data;
    console.log("Products:" ,pos);
    setPosts(pos);
    }
          
      
      
  }
    
    const getPosts=async()=>{
        const api='https://jsonplaceholder.typicode.com/posts'
      const response= await axios.get(api).catch(err=>console.log(err));
      if(response){
      const posts=response.data;
      console.log("Products:" ,posts);
      setPosts(posts);
      }
            
        
        
    }

   
    // const columns=useMemo(()=>COLUMNS,[]);
    // const data=useMemo(()=>MOCK_DATA,[]);


    const [visible,setVisible]=useState(false);
  

    const deleteItem = (index) => {
        if(window.confirm("Are you sure want to delete?")) {
        try {
          const newTodoItems = [...posts]
        newTodoItems.splice(index, 1)
        setPosts(newTodoItems);
        alert("Data has been deleted successfully");
        setVisible(false);
        } catch (error) {
          getPosts();
          setVisible(true);
        }
        }else{
            setVisible(true);
           
        }
        }


    //   const d=(i)=>{
    //     let copy=[...posts];
    //     copy=copy.filter(
    //         (item,id)=>i!=id
    //     )
    //     setPosts(copy);
    //   }

    // ({row})=>(
    //     <button   onClick={()=>handleDelete(row.id)}>Delete</button>
    // )

    const tableHooks=(hooks)=>{
        hooks.visibleColumns.push((columns)=>[
            ...columns,
            {
                id:"Delete",
                Header:'Delete',
                Cell:({row})=>{
                    return( 
                            
                            <button className='delete btn btn-danger ml-3'   onClick={() =>deleteItem(row.id)}>Delete</button>
                        
                    );
                 }      
            }
        ]);
    }

    const productData=useMemo(()=>[...posts],[posts]);
    const productColumns=useMemo(()=>posts[0] ? Object.keys(posts[0]).filter((key)=> key!=="userId").map((key)=>{
        return{ Header:key,accessor:key};
    }) :  [],[posts]);

 const tableInstance= useTable(
    {
    columns:productColumns,
    data:productData,
    },
    tableHooks,
    
  );


  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance

  useEffect(()=>{
       
    getPosts();
},[]);


return(
<div class="wrap">
<h1>React Table</h1>
{visible ?<div style={successMessage}>Error:Data could get deleted!</div>:null}
<table {...getTableProps()} class="table table-bordered table-striped">
    <thead >
    {headerGroups.map((headerGroup)=>(
        <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map((column)=>(
                <th {...column.getHeaderProps()}  style={{backgroundColor:'#4CAF50'}}>{column.render('Header')}</th>
            ))}
        </tr>
    ))}
      
    </thead>
    <tbody {...getTableBodyProps()}>
    {
        rows.map(row => {
            prepareRow(row)
         return (
          
           <tr {...row.getRowProps()}>
             {
             row.cells.map(cell => {
               
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
             {/* <button onClick={()=>handleDelete(row.id)}>Delete</button> */}
           </tr>
          
         )
       })
    }
    </tbody>
    <tfoot>
        {
            footerGroups.map((footerGroup)=>(
        <tr {...footerGroup.getFooterGroupProps()} >
           {footerGroup.headers.map((column)=>(
                <td {...column.getFooterProps()} style={{backgroundColor:'#4CAF50'}}>
                {column.render('Footer')}
                </td>
            ))}
        </tr>
    ))
        }
    </tfoot>
</table>
</div>



)
}