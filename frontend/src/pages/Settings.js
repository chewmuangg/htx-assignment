import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Settings() {

  // Update and Delete account here

  // variables 
  const navigate = useNavigate();

  useEffect( () => {

  }, [navigate]);
  return (
    <div>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      Settings
    </div>
  )
}

export default Settings