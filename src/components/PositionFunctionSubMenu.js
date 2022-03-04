import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/home.scss";

const SidebarLink = styled(Link)`
  display: flex;
  

`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #fff;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  width:300px;
  margin-left:25px;
  
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    
    <>
     
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav } className="filter-container">
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav && 
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
   
    </>
  
  );
};

export default SubMenu;
