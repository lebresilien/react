import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { Component } from "react";

  class Profils extends React.Component {
   

    _eventClick(event)
    {
      
      //this.setState({ label: event.target.value });
      alert(this.state.transactions)
    }

    render() {
      return (
        
        <ul class="w-full">
             <h1 class="font-sans text-lg text-gray-800 text-center my-4">
                Liste des elements
             </h1>
            {this.props.transactions.map((trx) => (
                <li class="cursor-pointer border-solid border-4 border-green-100 my-2 shadow"
                     key={trx.id} value={trx.id} onClick={this._eventClick.bind(this)}>
                    {trx.type}
                </li>
            ))}
        </ul>
      )
    }

  }

  

export default  Profils;
