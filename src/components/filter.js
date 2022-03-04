import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/home.scss";
import {FaCaretDown} from "react-icons/fa"
//import { SidebarData } from "../components/SidebarData";
import SubMenu from "./PositionFunctionSubMenu";
import axios from "axios";

// eslint-disable-next-line import/default

const DropDownContainer = styled("div")`
  
`;

const DropDownHeader = styled("div")`
  
  height:20px;
  width: 300px;

  
  
`;

const DropDownListContainer = styled("div")`
  
`;

const DropDownList = styled("ul")`
 
 
`;

// const ListItem = styled("li")`
//   list-style: none;
//   margin-bottom: 0.8em;
// `;

//const options = ["5 per page","25 per page", "Display all"];

export default function filter() {
  const [isOpen, setIsOpen] = useState(false);

  const [listOfItems, setListOfItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAllActivitites = []

  let getSubMenus = []
  //const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () =>{
    setIsOpen(!isOpen);
    
  }

  // const onOptionClicked = value => () => {
  //   setSelectedOption(value);
  //   setIsOpen(false);
 
  // };

  const getNewsFeed = async () => {
    try{
      setLoading(true);
  
  
      // eslint-disable-next-line quotes
      let url = `https://test-api.mojob.io/public/job/position-functions/?page_size=100`;
    
      axios({
        method: "get",
        url: url
      }).then(response => {
        
        for(let i = 0; i < response.data["results"].length; i++){
          let position = response.data["results"][i];
          getSubMenus = [];
         
          for(let j = 0; j < position.children.length; j++){
           
            let subFunction = position.children[j]
            getSubMenus.push({
              title: subFunction.name,
              path: "/",
              icon: <input type="checkbox" />,
              cName: "sub-nav"
            });
            
          }
          
           
          getAllActivitites.push({
            title:position.name,
            path: "/",
            icon: <input type="checkbox" />,
            subNav: getSubMenus
          })
         

          
          

          
          
            
        }
        setListOfItems([])
        setListOfItems((row) => [...row, ...getAllActivitites]);
       
        setLoading(false); 
        //loop to get each of the page job feed
         
      }) .catch(error => {
        setLoading(false);
        setError(error);
      }
      )
    
      
        
      
    }catch (err) {
      setLoading(false);
      setError(error);
    
    }
  }
  useEffect(() => {
    getNewsFeed();
  },[]);

  
  const onOptionClicked =(title)=>{
   
    let listCopy = [...listOfItems];
    let filteredDataSource = listCopy.filter((item) => {
      if (item.title === title ) {
       
        item.icon = <input type="checkbox" checked />
      }
     
      
      return item;
  
    })
    setListOfItems([])
    setListOfItems(filteredDataSource)
    

  }
   
  return (
    <>
      <div className="container">
        <div >
          <DropDownContainer >
            <DropDownHeader onClick={toggling} className="header-style">
              <span> { "Filter by position"}<i> <FaCaretDown /></i> </span>
            </DropDownHeader>
            {isOpen && (
              <DropDownListContainer className="f-container">
                {listOfItems.map((item, index) => {
                  
                  return(
                    <DropDownList className="dropdown-list-style2" key={index} onClick={() => onOptionClicked(item.title)}>
                      
                  
                      <div >
                        {loading  && <p>Loading...</p>}
                        {error  && <p>{error.message}</p>}
                        <SubMenu item={item}   />
                      </div>
                    

                
                    </DropDownList>
                  )})}
              </DropDownListContainer>
            )}
          </DropDownContainer>
        </div>
      </div>
    </>
  )


}

