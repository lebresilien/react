import React, { Component } from "react";
import Layout from "../components/layout";
import dogIllustration from "../images/dog-illustration.svg";
import {getFoundUser, loadingUser , deleteUser, updateUser, addUser, allProfil} from "../server/server";
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

  class UserPage extends React.Component {
    
    constructor(props) {
      super(props)
      this.id = ""
      this.state = {
        users: [], 
        phone: "",email: "",
        total: null,
        per_page: null,
        current_page: 1,
        hero:null,
        name: "",surname: "",
        id_card: ""
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
             users: record.data,
             total: record.total,
             per_page: record.per_page,
             current_page: record.current_page
          });
        }
        
    }

    componentDidMount() {
   
        loadingUser(this.state.current_page).then(data => {
            this._updating(data);
        });

        this._placerProfil()
    }

    _loadingPaginate(page)
    {
      loadingUser(page).then(data => {
            this._updating(data);
        });
    }

   /*_loadUser(){
       if (this.searchedText.length > 0) {
           getFoundUser(this.searchedText).then(data => {
              this.setState({ users: data.data });
           })
       }else
       {
        loadingUser(this.state.current_page).then(data => {
            this.setState({ users: data.data});
        });
       }      
    }*/

   _handleChange(event) {
       let searchedText = event.target.value
       if(searchedText.length > 0){
           getFoundUser(searchedText).then(data => {
              this._updating(data);
           })
       }else
       {
        loadingUser(this.state.current_page).then(data => {
            this.setState({ users: data.data});
        });
       } 
    }

    _enventUpdate(event)
     { 
      let parent = event.target.parentNode.parentNode.children 
      this.setState({name: parent[0].innerText});
      this.setState({surname: parent[1].innerText});
      this.setState({email: parent[2].innerText});
      this.setState({phone: parent[3].innerText});
      this.setState({id_card: parent[4].innerText});
      this.id = event.target.parentNode.parentNode.getAttribute('name')
     }

     _suppressionUser(id)
     {
         deleteUser(id).then((info) => {
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

     _enventSuppression(id)
     {
       //let id = event.target.parentNode.parentNode.getAttribute('name')
       this._suppressionUser(id)
     }

     _modifierUser()
     {
       updateUser(this.id,this.state.name,this.state.surname,
           this.state.email,this.state.phone,this.state.id_card).then(() => {
           loadingUser(this.state.current_page).then(data => {
              this._updating(data);
        
           });
         })
     }

     _ajouterUser()
     {
        let profil_id = document.getElementById('select_profil').value
        let name = document.getElementById('name').value
        let surname = document.getElementById('surname').value
        let phone = document.getElementById('phone').value
        let password = document.getElementById('password').value
        let id_card = document.getElementById('id_card').value
        let email = document.getElementById('email').value

        addUser(name,surname,id_card,password,email,profil_id,phone).then((info) => {
           if(info === "ok")
           {
             loadingUser(this.state.current_page).then(data => {
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
     _handlePasswordChange(event)
     {
       this.setState({password: event.target.value})
     }
     _handleEmailChange(event)
     {
       this.setState({email: event.target.value})
     }
    /*_handleProfilChange(event)
     {
       this.setState({label: event.target.value})
     }*/

     _placerProfil(){
         allProfil().then((data) => {
          this.setState({hero: data})
         })
     }

  render() {
      let user, renderPageNumbers, renderHero,id
      
      if(this.state.users !== null)
      {
        user = this.state.users.map((User) => (
           <tr key={User.id}  name={User.id} id={User.id}>
             <td>{User.name}</td><td>{User.surname}</td>
             <td>{User.email}</td><td>{User.phone}</td>
             <td>{User.id_card}</td><td>{User.profil_id}</td>
             <td>
               <img class="cursor-pointer" onClick={this._enventUpdate.bind(this)} src="https://img.icons8.com/color/32/000000/edit-property.png"/>
             </td>
             <td>
              <img class="cursor-pointer" src="https://img.icons8.com/ultraviolet/32/000000/content.png"/>
             </td>
             <td>
              <img class="cursor-pointer" onClick={() => {if(window.confirm("Delete the item?")){this._enventSuppression(User.id)};}} src="https://img.icons8.com/flat_round/32/000000/delete-sign.png"/>
             </td>
           </tr>
        ))
      }

      if(this.state.hero !== null)
      {
        renderHero = this.state.hero.map((profil) => (
           <option key={profil.id}  value={profil.id}>
               {profil.name}
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
                         profil
                    </label>
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
                            " id="select_profil">
                       {renderHero}
                     </select>
                 </div>
                 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase  text-gray-700 text-xs font-bold mb-2">
                         Password
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     type="text" placeholder="Password" id="password" value={this.state.password} onChange={this._handlePasswordChange.bind(this)}/>
                 </div>
                 
              </div> 
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                       type="button" onClick={this._ajouterUser.bind(this)}>
                         Ajouter
                    </button>
                    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                    type="button" onClick={this._modifierUser.bind(this)}>
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
                    <th>Nom</th><th>Prenom</th><th>Email</th>
                    <th>Phone</th><th>ID</th><th>Profil</th>
                    <th colspan="3">Operations</th>
                   </tr>
                  </thead>
                  <tbody>
                    {user}
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

export default UserPage;