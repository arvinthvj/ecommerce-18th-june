import React, { useEffect, useState } from 'react';
import "./Nav.css"
import MyntraPic from "./Myntra_logo.png"
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

import {UserOutlined, HeartTwoTone , ShoppingTwoTone} from '@ant-design/icons';

const { Search } = Input;
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
        let fetcheddata = await fetch("https://rcz-vam-1.herokuapp.com/api/myntraDataAll");
        let converetedRedabledata = await fetcheddata.json();
        setnavCenterData(converetedRedabledata);
    };
    getCenterData();
        
},[])

const content =(Gender)=>{
    debugger
let contentFilteredForClassification = navCenterData.filter((e)=>{return e.Gender == Gender}).map(e=>e.ProductName);

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
                {[...new Set(navCenterData.map(e=>e.Gender))].map(e=>(
                    <Popover content={content(e)} title="Title" trigger={"click"}>
                        <p>{e}</p>
                  </Popover>
             
                ))}
            </div>     
            <div>
            <Search placeholder="input search text"  enterButton />
                </div>  
            <div className="Nav_rightSide_contents">
              {rightData.map(e=>(
                  <p style={{display: 'flex' , flexDirection: 'column-reverse'}}>{e} <span >{e == "Profile" ? <UserOutlined /> : e == "Wishlist" ? <HeartTwoTone /> : <ShoppingTwoTone />}</span></p>
              ))}
            </div>     
        </div>
    );
}

export default NavBar;