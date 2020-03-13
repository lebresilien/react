import React, { Component } from "react";
import Layout from "../components/layout";
import dogIllustration from "../images/dog-illustration.svg";
import {getFoundClient, loadingClient , deleteClient, updateClient, addClient, allUser} from "../server/server";
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

  class ClientPage extends React.Component {
    
    constructor(props) {
      super(props)
      this.id = ""
      this.sexe = ""
      this.user_id = ""
      this.state = {
        clients: [], 
        surname: "",email: "",
        total: null,
        per_page: null,
        current_page: 1,
        hero:null,
        name: "",id_card: "",
        phone: ""
      }
      this._handleChange = this._handleChange.bind(this); 
      this._enventSuppression = this._enventSuppression.bind(this)
    }

    _updating(record)
    {
        if(record === "empty")
        {

        }else
        {
          this.setState({
             clients: record.data,
             total: record.total,
             per_page: record.per_page,
             current_page: record.current_page
          });
        }
        
    }

    componentDidMount() {
   
        loadingClient(this.state.current_page).then(data => {
            this._updating(data);
        });

        this._placerUser()
    }

    _loadingPaginate(page)
    {
      loadingClient(page).then(data => {
            this._updating(data);
        });
    }

   _handleChange(event) {
       let searchedText = event.target.value
       if(searchedText.length > 0){
           getFoundClient(searchedText).then(data => {
              this._updating(data);
           })
       }else
       {
        loadingClient(this.state.current_page).then(data => {
            this.setState({ clients: data.data});
        });
       } 
    }

    _enventUpdate(event)
     { 
      let parent = event.target.parentNode.parentNode.children 
      this.setState({name: parent[0].innerText});
      this.setState({surname: parent[1].innerText});
      this.setState({email: parent[3].innerText});
      this.setState({id_card: parent[5].innerText});
      this.setState({phone: parent[4].innerText});
      this.id = event.target.parentNode.parentNode.getAttribute('name')
     }

      _enventSuppression(id)
     {
       this._suppressionClient(id)
     }

     _suppressionClient(id)
     {
         deleteClient(id).then((info) => {
           if(info === "error")
           {
              ToastsStore.error("Echec de l'operation!!!!!!!")
           }else
           {
              document.getElementById(id).remove()
              ToastsStore.success("Suppression Reussie!!!!!!!")
           }
           
         })
         
     }

     _modifierClient()
     {
       updateClient(this.id,this.state.name,this.state.surname,
           this.state.phone,this.state.email,this.state.id_card).then(() => {
           loadingClient(this.state.current_page).then(data => {
              this._updating(data);
           });
         })
     }

     _ajouterClient()
     {
        let user_id = document.getElementById('select_user').value
        let test = document.getElementsByTagName('input')
        let sexe
        for(let i = 0; i < test.length; i++) {       
            if(test[i].type="radio") { 
                  
              if(test[i].checked) 
                sexe = test[i].value
            } 
        } 
       
        addClient(this.state.name,this.state.surname,this.state.id_card,
                  this.state.email,user_id,this.state.phone,sexe).then((info) => {
           if(info === "ok")
           {
             loadingClient(this.state.current_page).then(data => {
             this._updating(data)
           });
             ToastsStore.success("Insertion Reussie!!!!!!!")
             this.setState({
                  name: '', surname: '', phone: '',
                  email: '', password: '', id_card: ''
             })
           }else
           {
             ToastsStore.error("Cet Utilisateur existe deja!!!!!!!")
           }
          
        })
     }

     _handleNameChange(event)
     {
       this.setState({name: event.target.value})
     }
     _handleSexeChange(event)
     {
       this.sexe = event.target.value
     }
     _handleSurnameChange(event)
     {
       this.setState({surname: event.target.value})
     }
     _handlePhoneChange(event)
     {
       this.setState({phone: event.target.value})
     }
     _handleIdCardChange(event)
     {
       this.setState({id_card: event.target.value})
     }
     _handleEmailChange(event)
     {
       this.setState({email: event.target.value})
     }
     _handleSexeChange(event)
     {
       this.setState({sexe: event.target.value})
     }
     _handleUserChange(event)
     {
       this.user_id = event.target.value
     }

     _placerUser(){
         allUser().then((data) => {
          this.setState({hero: data})
         })
     }

  render() {
      let client, renderPageNumbers, renderHero;
      
      if(this.state.clients !== null)
      {
        client = this.state.clients.map((Client) => (
           <tr key={Client.id}  name={Client.id} id={Client.id}>
             <td>{Client.nom}</td><td>{Client.prenom}</td>
             <td>{Client.sexe}</td><td>{Client.email}</td>
             <td>{Client.telephone}</td><td>{Client.id_card}</td>
             <td>
              <img class="cursor-pointer" onClick={this._enventUpdate.bind(this)} src="https://img.icons8.com/color/32/000000/edit-property.png"/>
             </td>
             <td>
              <img class="cursor-pointer" src="https://img.icons8.com/ultraviolet/32/000000/content.png"/>
             </td>
             <td>
              <img class="cursor-pointer" onClick={() => {if(window.confirm("Delete the item?")){this._enventSuppression(Client.id)};}} src="https://img.icons8.com/flat_round/32/000000/delete-sign.png"/>
             </td>
           </tr>
        ))
      }

      if(this.state.hero !== null)
      {
        renderHero = this.state.hero.map((user) => (
           <option key={user.id}  value={user.id}>
               {user.name} {user.surname}
           </option>
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
           <div class="w-full justify-center">
            <form class="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
              <div class="flex flex-wrap -mx-3 mb-6">
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase  text-gray-700 text-xs font-bold mb-2">
                         Nom
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text" placeholder="Nom" id="name" value={this.state.name} onChange={this._handleNameChange.bind(this)}/>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                         Prenom
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     type="text" placeholder="Prenom" id="surname" value={this.state.surname} onChange={this._handleSurnameChange.bind(this)}/>
                 </div>
                 <div class="mx-auto max-w-sm flex flex-wrap ">
                    <label class="block uppercase flex items-center mr-4 mb-4 font-bold mb-2 text-gray-700">sexe</label>
                    <div class="flex items-center mr-4 mb-4">
                        <input id="radio1" type="radio" name="sexe" class="hidden" value="H" checked/>
                        <label for="radio1" class="flex items-center cursor-pointer">
                           <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                Homme
                        </label>
                    </div>
                    <div class="flex items-center mr-4 mb-4">
                        <input id="radio2" type="radio" name="sexe" class="hidden" value="F"/>
                        <label for="radio2" class="flex items-center cursor-pointer">
                           <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                                Femme
                        </label>
                    </div>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase  text-gray-700 text-xs font-bold mb-2">
                         email
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     type="text" placeholder="Email" id="email" value={this.state.email} onChange={this._handleEmailChange.bind(this)}/>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                         telephone
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     type="text" placeholder="Telephone" id="phone" value={this.state.phone} onChange={this._handlePhoneChange.bind(this)}/>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase  text-gray-700 text-xs font-bold mb-2">
                         identification
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     type="text" placeholder="identification" id="id_card" value={this.state.id_card} onChange={this._handleIdCardChange.bind(this)}/>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                         utilisateurs
                    </label>
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
                            " id="select_user" onChange={this._handleUserChange.bind(this)}>
                       {renderHero}
                     </select>
                 </div>
                 
              </div> 
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                       type="button" onClick={this._ajouterClient.bind(this)}>
                         Ajouter
                    </button>
                    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                    type="button" onClick={this._modifierClient.bind(this)}>
                         Modifier
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
                    <th>Nom</th><th>Prenom</th><th>Sexe</th>
                    <th>Email</th><th>Phone</th><th>ID</th>
                    <th colspan="3">Operations</th>
                   </tr>
                  </thead>
                  <tbody>
                    {client}
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

export default ClientPage;