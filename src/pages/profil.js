import React, { Component } from "react";
import Layout from "../components/layout";
import dogIllustration from "../images/dog-illustration.svg";
import {getFoundProfil, loadingProfil , deleteProfil, updateProfil, addProfil} from "../server/server";
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

  class ProfilPage extends React.Component {
    
    constructor(props) {
      super(props)
      this.searchedText = ""
      this.id = ""
      this.state = {
        profils: [], 
        label: "",
        total: null,
        per_page: null,
        current_page: 1
      }
      this._handleChange = this._handleChange.bind(this);
    }

    _updating(record)
    {
        if(record === "empty")
        {

        }else
        {
          this.setState({
             profils: record.data,
             total: record.total,
             per_page: record.per_page,
             current_page: record.current_page
          });
        }
        
    }

    componentDidMount() {
   
        loadingProfil(this.state.current_page).then(data => {
            this._updating(data);
        });
    }

    _loadingPaginate(page)
    {
      loadingProfil(page).then(data => {
            this._updating(data);
        });
    }

    _loadProfil(){
       if (this.searchedText.length > 0) {
           getFoundProfil(this.searchedText).then(profils => {
              this.setState({ profils });
           })
       }else
       {
        loadingProfil(this.state.current_page).then(data => {
            this.setState({ profils: data.data});
        });
       }      
    }

   _handleChange(event) {
      this.searchedText = event.target.value
      if(this.searchedText.length > 0){
           getFoundProfil(this.searchedText).then(data => {
              this._updating(data);
           })
       } 
    }

    _eventClick(event)
     {  
      this.setState({ label: event.target.parentNode.firstChild.innerText});
      this.id = event.target.parentNode.getAttribute('name')
     }

     _suppressionProfil()
     {
         deleteProfil(this.id).then((info) => {
           if(info === "error")
           {
              ToastsStore.error("Echec de l'operation!!!!!!!")
           }else
           {
             loadingProfil(this.state.current_page).then(data => {
              this._updating(data);
           });
            ToastsStore.success("Suppression Reussie!!!!!!!")
           }
           
         })
     }

     _modifierProfil()
     {
       updateProfil(this.id, this.state.label).then(() => {
           loadingProfil(this.state.current_page).then(data => {
              this._updating(data);
              console.log(data)
           });
         })
     }

     _ajouterProfil()
     {
       addProfil(this.state.label).then((info) => {
           if(info === "ok")
           {
             loadingProfil(this.state.current_page).then(data => {
             this.setState({ 
              profils: data.data,
              label: '' 
             });
           });
             ToastsStore.success("Insertion Reussie!!!!!!!")
           }else
           {
             ToastsStore.error("Ce nom existe deja!!!!!!!")
           }
           
         })
      
     }

     _handleChanging(event)
     {
       this.setState({label: event.target.value})
     }

  render() {
      let prof, renderPageNumbers;
      
      if(this.state.profils !== null)
      {
        prof = this.state.profils.map((profil) => (
           <tr key={profil.id} onClick={this._eventClick.bind(this)} name={profil.id} >
            <td  name={profil.id} value={profil.id}>
                {profil.name}
            </td>
           </tr>
        ))
      }

      const pageNumbers = [];
      if(this.state.total !== null) {
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
                       type="button" onClick={this._ajouterProfil.bind(this)}>
                        Ajouter
                  </button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button" onClick={this._modifierProfil.bind(this)}>
                        Modifier
                  </button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button" onClick={this._suppressionProfil.bind(this)}>
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
                    <th>Libelle</th>
                   </tr>
                  </thead>
                  <tbody>
                    { prof }
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