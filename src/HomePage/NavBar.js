import React, { useEffect, useState } from 'react';
import "./Nav.css"
import MyntraPic from "./Myntra_logo.png"
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

import {UserOutlined, HeartTwoTone , ShoppingTwoTone} from '@ant-design/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
const { Search } = Input;
import { Button, Popover } from 'antd';




const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };


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
const [whatChildrenToMap , setChildrenWhatToMap]  = useState([]);
const [dataSetForBrandAndBrandnames , setDataSetForBrandAndBrandnames] = useState([]);
useEffect(()=>{
   async function getCenterData(){
        let fetcheddata = await fetch("https://rcz-vam-1.herokuapp.com/api/myntraDataAll");
        let converetedRedabledata = await fetcheddata.json();
        setnavCenterData(converetedRedabledata);
        let brandData = [];
        let dataSetCreation = [...new Set(converetedRedabledata.map(r=> r.ProductBrand))].map(e=>{

            let filterForCurrentLoopBrand = converetedRedabledata.filter(o=> o.ProductBrand == e);

            
            return {
                value : e,
                gender : converetedRedabledata.filter(brandObject=> brandObject.ProductBrand == e)[0].Gender,
                children : filterForCurrentLoopBrand.map(x=>{
                    return {
                        value : x.ProductName, ...x
                    }
                })
            }
        });

        setDataSetForBrandAndBrandnames(dataSetCreation);

    };
    getCenterData();
        
},[])
// const options = [
//     {
//       value: 'zhejiang',
//       label: 'Zhejiang',
//       children: [
//         {
//           value: 'hangzhou',
//           label: 'Hangzhou',
//           children: [
//             {
//               value: 'xihu',
//               label: 'West Lake',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       value: 'jiangsu',
//       label: 'Jiangsu',
//       children: [
//         {
//           value: 'nanjing',
//           label: 'Nanjing',
//           children: [
//             {
//               value: 'zhonghuamen',
//               label: 'Zhong Hua Men',
//             },
//           ],
//         },
//       ],
//     },
//   ];
const content =(Gender)=>{
    debugger

console.log(dataSetForBrandAndBrandnames)
    return (
        <div className="cascadingWholeContainer">
        {dataSetForBrandAndBrandnames.filter(e=> e.gender == Gender).map(e=> (
            <>
            <div className="firstlayer">
            <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem onClick={()=>{handleLayer(e.value)}} button>
        <ListItemText primary={e.value} />
      </ListItem>
      <Divider />
    </List>
            
           {/* <p onClick={()=>{handleLayer(e.value)}}> {e.value} </p> */}
           <div className="secondlayer" >
           {
            whatChildrenToMap && whatChildrenToMap.value == e.value ? whatChildrenToMap.children.map(f=>(
                <>
              <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary={f.value} />
      </ListItem>
      <Divider />
    </List>
    </>
           ))
           : null}
           </div>
           </div>
            </>
        ))}
    </div> 
    )
};

const handleLayer =(vaueThatIsClicked)=>{
    let filtered = dataSetForBrandAndBrandnames.filter(e=> e.value == vaueThatIsClicked);
    setChildrenWhatToMap(filtered[0]);
}

    return (
        <>
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
       
        </>
    );
}

export default NavBar;