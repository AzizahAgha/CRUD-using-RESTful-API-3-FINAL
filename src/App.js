import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import EditPost from './components/Edit';
import ListPost from './components/ListPost';
//import Listing from './components/Listing.tsx';
//import Table from './components/newTable';
import {BasicTable}  from './components/BasicTable';

//import CreatePost from './components/Create';
import { lazy,Suspense } from 'react';
const CreatePost=lazy(()=>import('./components/Create'));

function App() {
  return (
    <div className="App">
    <Suspense fallback={<div>Loading...</div>}>
     <BrowserRouter>
      <nav>
        <ul className='ul'>
          <li className='li'>
            <Link to="/" className=" btn btn-primary btn-xs">List Posts</Link>
          </li>
          <li className='li'>
          <Link to="/create" className=" btn btn-primary btn-xs">Create Post</Link>
          </li>
          <li>
          <Link className="btn btn-warning mr-3" to="/edit/:id">update</Link>
          </li>
          {/* <li className='li'>
          <Link to="/list" className=" btn btn-primary btn-xs">Listing</Link>
          </li> */}
          {/* <li className='li'>
          <Link to="/table" className=" btn btn-primary btn-xs">Table</Link>
          </li> */}
          <li className='li'>
          <Link to="/btable" className=" btn btn-primary btn-xs">BasicTable</Link>
          </li>
        </ul>
      </nav>
     
      <Routes>
        <Route index element={<ListPost />}></Route>
        <Route className='btn btn-primary' path="/create" element={<CreatePost />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
        {/* <Route path="/list" element={<Listing />}></Route> */}
        {/* <Route path="/table" element={<Table />}></Route> */}
        <Route path="/btable" element={<BasicTable />}></Route>
      </Routes>
     </BrowserRouter>
     </Suspense>
    </div>
  );
}

export default App;


// import './App.css';
// import PostList from './API/PostList';

// function App(){
//   return(
//     <div className="App">
//       <PostList></PostList>
//     </div>
//   )
// }

// export default App;