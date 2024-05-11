import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoggedIn } from './redux/slices/authSlice';
import { setCurrentPage, setPageList } from './redux/slices/navSlice';


import Home from "./Home";
import Header from "./components/Header";
import Menu from "./components/Menu.js"
import SignIn from "./modules/authentication/pages/SignIn";
import SignUp from "./modules/authentication/pages/SignUp";
import ResetPassword from "./modules/authentication/pages/ResetPassword";
import Profile from "./modules/account/pages/Profile";
import Settings from "./modules/account/pages/Settings";


function App() {

  // Set application details:
  const appName = "template"
  const logoFile = "nlightn_labs_logo.png"
  const dbName = "main"
  const fileStorageBucketName = "nlightnlabs01"
  const theme = "nlightn labs main"

  // Global States
  const user = useSelector(state => state.authentication.user);
  const userLoggedIn = useSelector(state => state.authentication.userLoggedIn);
  const currentPage = useSelector(state => state.navigation.currentPage);
  
  const dispatch = useDispatch();
 

  // local states
  const [pages, setPages] = useState([])
  const [menuItems, setMenuItems] = useState([])

  // Setup data
  const pageData = [
    { id: 1, section: 0, name: "SignIn", label: "Sign In", Icon: "",component: <SignIn/>, showOnMenu: false },
    { id: 2, section: 0, name: "SignUp", label: "Sign Up",Icon: "", component: <SignUp />, showOnMenu: false},
    { id: 3, section: 0, name: "ResetPassword", label: "Reset Password", Icon: "",component: <ResetPassword/>, showOnMenu: false},
    { id: 4, section: 1, name: "Home", label: "Home", icon: "HomeIcon", component: <Home/>, showOnMenu: true},
    { id: 5, section: 1, name: "Profile", label: "Profile", icon: "ProfileIcon", component: <Profile/>, showOnMenu: true},
    { id: 6, section: 1, name: "Settings", label: "Settings",icon: "SettingsIcon", component: <Settings/>, showOnMenu: true}
  ];

  
  const getMenuItems = async ()=>{
    let menuItems = []
    pageData.map(item=>{
      if(item.showOnMenu){
        delete item.component
        menuItems.push(item)
      }})
    setMenuItems(menuItems)
  }


  useEffect(() => {
    getMenuItems()
  }, []);


  return (
    <div className="flex-container overflow-hidden" style={{height: "100vh", width: "100vw"}}>
        
        <Header appName={appName} logo={logoFile}/>

        <div className="d-flex w-100" style={{height:"100%"}}>
          {!userLoggedIn && currentPage==="SignUp" ?
            <SignUp/>
          :
          !userLoggedIn ?
            <SignIn/>
          :
            <div className="d-flex w-100 justify-content-between" style={{height:"100%"}}>
                {pageData.length>0  && (pageData.find(i=>i.name ===currentPage).component)}
                {menuItems.length>0 && <Menu menuItems={menuItems} colorTheme="nlightn blue"/> }
            </div>
          }
        </div>

    </div>
  );
}

export default App;

