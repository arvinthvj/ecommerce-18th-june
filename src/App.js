import './App.css';
import Home from './HomePage/Home';
import { collection, addDoc } from "firebase/firestore"; 
import db from './firebase';
import data from './myntraData';

// Add a new document with a generated id.

console.log("Document written with ID: ");

function App() {
  const handleUploadInFirebase= async()=>{
    //make a loop to push 500 data 
      
     data.map(async(e)=>{
      await addDoc(collection(db, "testSharmila"), e);
     })
   
  }
  return (
    <div className="App">
     <Home/>
     <button onClick={()=>{handleUploadInFirebase()}}>Upload data</button>
    </div>
  );
}

export default App;
