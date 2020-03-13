import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { Component } from "react";

const ProfilsItem = ({ transactions }) => {
      return (
        <div class="border-solid border-4 border-green-100 my-2 shadow">
          <center><h1>Contact List</h1></center>
          {transactions.map((trx) => (
                <p class="cursor-pointer">{trx.type}</p>
          ))}
        </div>
      )
    
};

export default  ProfilsItem;
