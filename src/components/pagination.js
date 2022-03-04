import React, { useState } from "react";
import styled from "styled-components";
import "../styles/home.scss";
import {FaCaretDown} from "react-icons/fa"
var doSomething = require("../pages/home").getNewsFeed;


const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  
  font-weight: 500;
  font-size: 1.3rem;
 
  
  
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
 
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;


export default function pagination() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("5 per page");
  const options = ["5 per page","25 per page", "Display all"];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (index) => {
   
    setSelectedOption(options[index]);
    setIsOpen(false);
   
    if(index == 0){
      localStorage.setItem("pageSize", 5)
      
      doSomething.getNewsFeed();
     
    }else{
      if(index == 1){
        localStorage.setItem("pageSize", 25)
        doSomething.getNewsFeed();
      }}
   
 
  };

  return (
    <div className="container">
      <div className="p-container">
        <DropDownContainer>
          <DropDownHeader onClick={toggling} className="header-style">
            <span> {selectedOption}<FaCaretDown /> </span>
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList className="dropdown-list-style">
                {options.map((option,index) => (
                  <ListItem onClick={() => onOptionClicked(index)}  key={index}>
                    {option}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </div>
    </div>
  );
}