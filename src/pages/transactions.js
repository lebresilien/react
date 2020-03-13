import React, { Component } from "react";
import Layout from "../components/layout";
import dogIllustration from "../images/dog-illustration.svg";
import {getFoundTrx, loadingTrx , deleteTrx, updateTrx, addTrx} from "../server/server";
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

  class ProfilPage extends React.Component {
    
    constructor(props) {
      super(props)
      this.searchedText = ""
      this.id = ""
      this.state = {
        transactions: null, 
        label: "",
        total: null,
        per_page: null,
        current_page: 1
      }
      this._handleChange = this._handleChange.bind(this);
    }

    componentDidMount() {
   
        loadingTrx(this.state.current_page).then(data => {
            //Fetched product is stored in the state
            this.setState({
             transactions: data.data,
             total: data.total,
             per_page: data.per_page,
             current_page: data.current_page
            });
        });
    }

    _loadingPaginate(page)
    {
      loadingTrx(page).then(data => {
            //Fetched product is stored in the state
            this.setState({
             transactions: data.data,
             total: data.total,
             per_page: data.per_page,
             current_page: data.current_page
            });
        });
    }

   _loadTrx(){
       if (this.searchedText.length > 0) {
           getFoundTrx(this.searchedText).then(transactions => {
              this.setState({ transactions });
           })
       }else
       {
        loadingTrx(1).then(transactions => {
            //Fetched product is stored in the state
            this.setState({ transactions });
        });
       }      
    }

   _handleChange(event) {
      this.searchedText = event.target.value
      //this._loadTrx()
    }

    _eventClick(event)
     {  
      this.setState({ label: event.target.parentNode.firstChild.innerText});
      this.id = event.target.parentNode.getAttribute('name')
     }

     _suppressionTrx()
     {
         deleteTrx(this.id).then(() => {
           loadingTrx(1).then(data => {
             this.setState({ 
              transactions: data.data,
              label: '',
              total: data.total,
              per_page: data.per_page,
              current_page: data.current_page

             });
           });
         })

     }

     _modifierTrx()
     {
       updateTrx(this.id, this.state.label).then(() => {
           loadingTrx(1).then(data => {
             this.setState({ 
              transactions: data.data,
              label: '',
              total: data.total,
              per_page: data.per_page,
              current_page: data.current_page 
             });
           });
         })


     }

     _ajouterTrx()
     {
       addTrx(this.state.label).then(() => {
           loadingTrx(1).then(transactions => {
             this.setState({ 
              transactions: transactions,
              label: '' 
             });
           });
         })
      ToastsStore.success("Insertion Reussie!!!!!!!")
     }

     _handleChanging(event)
     {
       this.setState({label: event.target.value})
     }

  render() {
      
      let trans, renderPageNumbers;
      
      if(this.state.transactions !== null)
      {
        trans = this.state.transactions.map((trx) => (
           <tr key={trx.id} onClick={this._eventClick.bind(this)} name={trx.id} >
            <td  name={trx.id} value={trx.id}>
                {trx.type}
            </td>
            <td>
                {trx.montant}
            </td>
           </tr>
        ))
      }

      const pageNumbers = [];
          if (this.state.total !== null) {
            for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
              pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
              let classes = this.state.current_page === number ? 'active' : '';
              return (
                <span key={number} className={classes} onClick={() => this._loadingPaginate(number)}>{number}</span>
              );
            });
      }

    return(
      <Layout>
       
        <section className="flex justify-center">
           <div class="w-1/2 justify-center">
            <form class="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Libelle
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   type="text" placeholder="libelle" value={this.state.label}  onChange={this._handleChanging.bind(this)} />
                </div>
                <div class="flex justify-between">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                       type="button" onClick={this._ajouterTrx.bind(this)}>
                        Ajouter
                  </button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button" onClick={this._modifierTrx.bind(this)}>
                        Modifier
                  </button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button" onClick={this._suppressionTrx.bind(this)}>
                        Supprimer
                  </button>
                </div>
            </form>

            <div class="flex">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                 type="text" placeholder="Rechercher" onChange={this._handleChange} />
            </div>
            
            <div class="w-full">
               <table className="table">
                  <thead>
                   <tr>
                    <th>Type</th>
                    <th>Montant</th>
                   </tr>
                  </thead>
                  <tbody>
                    { trans }
                  </tbody>
               </table>
               
            </div>

            
        </div>

        </section>
        <div className="pagination">
               {renderPageNumbers}
            </div>
        <ToastsContainer store={ToastsStore}  position={ToastsContainerPosition.TOP_RIGHT}  />
      </Layout>
    );
  }
}

export default ProfilPage;