import React, { useEffect, useState }from "react"; 
import Header from "../components/Header";
import Filter from "../components/filter";
import "../styles/home.scss";
import { FaCircle } from "react-icons/fa";
import dateFormat from "dateformat";
import styled from "styled-components";
import {FaCaretDown} from "react-icons/fa"
import axios from "axios";
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


const Home = () => {

  
  const [listOfItems, setListOfItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [noRecord, setIsNoRecord] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("5 per page");
  
  const options = ["25 per page", "Display all"];

  const toggling = () => setIsOpen(!isOpen);

  var pageSize = 5;
  const onOptionClicked = (index) => {
    
    setSelectedOption(options[index]);
  
    setIsOpen(false);
   
    if(index === 0){
      let num = 25;
      pageSize = num
      
      getNewsFeed()
     
     
    }else{
      let num = 100;
      pageSize = num
      getNewsFeed()
    }
   
 
  };
  const getNewsFeed = async () => {
    try{
      setLoading(true);


      // eslint-disable-next-line quotes
      let url = `https://test-api.mojob.io/public/job/listings/?include_open=False&page_size=${pageSize}&use_mojob_feed_filter=True&use_pagination=True`;
    
      axios({
        method: "get",
        url: url
      }).then(response => {
        listOfItems.length = 0;
        
        //setListOfItems(response.data["results"]);
        for(let i = 0; i < response.data["results"].length; i++){
          listOfItems.push(response.data["results"][i])
        }
        setListOfItems(listOfItems);
        
        setLoading(false); 
        
         
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


  if (error) {
    return <div>Error: {error.message}</div>;

  }else if (loading) {
    return <div>Loading...</div>; 
  
  }else {
   
    return (
      <div>
        <Header />
      
        <div className= "menu-container">
          <Filter />
        
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
          </div><br />

        </div >
        {listOfItems.map((item,index) =>{
          
          return(


            <div className= "home-container" key={index}>
              <div className="featured" >
                <div className="featuredItem">
                  <p className="featuredTitle">{item["job"].title}</p>
              
                  <div>
                    <p className="sub-title">{item["job"]["unit"].display_name}
                      <i><FaCircle /></i>
                      <span> {item["job"]["position_function"].id} </span>
                      <span>
                        {item["job"]["position_function"].name_en}
                     
                 
                      </span>
                      <span> {item["job"]["position_function"].name_nb}</span>

                      <i><FaCircle /></i>

                      <span>{dateFormat(item["job"].due_date, "dddd, mmmm dS, yyyy hh:mm:ssa")}</span>
                    </p>

                  </div>

                </div>

              </div>
            </div>
          )


        },)
      
        }
      

      </div>
    
    
    );
  }

};

export default Home;