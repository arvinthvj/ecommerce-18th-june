import React, { useEffect, useState } from 'react';
import "./Nav.css"
import MyntraPic from "./Myntra_logo.png"

import { Button, Popover } from 'antd';



const centerNavData = [
    "Men",
    "Women",
    "Kids",
    "Children",
    "Studio"
];


const rightData = [
    "Profile",
    "Wishlist",
    "Bag"
]



function NavBar(props) {

const [navCenterData , setnavCenterData] = useState([]);

useEffect(()=>{
   async function getCenterData(){
        let fetcheddata = await fetch("https://rcz-vam-1.herokuapp.com/api/shopData");
        let converetedRedabledata = await fetcheddata.json();
        setnavCenterData(converetedRedabledata);
    };
    getCenterData();
        
},[])

const content =(classification)=>{
    debugger
let contentFilteredForClassification = navCenterData.filter((e)=>{return e.classification == classification}).map(e=>e.category);

    return (
    <div>
      {contentFilteredForClassification.map(e=>(
          <p>{e}</p>
      ))}
    </div>
    )
};
    return (
        <div className="Nav_main">
            <div className="Nav-logo_left_content">
                <img className="Nav_logo_img" src={MyntraPic}></img>
            </div>
            <div className="Nav_centerContents">
                {[...new Set(navCenterData.map(e=>e.classification))].map(e=>(
                    <Popover content={content(e)} title="Title">
                        <p>{e}</p>
                  </Popover>
             
                ))}
            </div>       
            <div className="Nav_rightSide_contents">
              {rightData.map(e=>(
                  <p>{e}</p>
              ))}
            </div>     
        </div>
    );
}

export default NavBar;