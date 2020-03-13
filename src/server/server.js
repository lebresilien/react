
// fonctions concernant la table Transaction
export  function getFoundTrx(texte){
      const url ='http://localhost:9000/api/v1/trx/find/'+texte;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function loadingTrx(page){
      const url ="http://localhost:9000/api/v1/trx?page="+page;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function deleteTrx(id){
      const url ="http://localhost:9000/api/v1/trx/"+id;
      return fetch(url , {
      	      method: 'delete'
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function updateTrx(id,type){
      const url ="http://localhost:9000/api/v1/trx/"+id;
      return fetch(url ,{
			method: 'PUT',
			body: JSON.stringify({
				type: type,
				
			}),
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function addTrx(type){
      const url ="http://localhost:9000/api/v1/trx/";
      return fetch(url ,{
      method: 'POST',
      body: JSON.stringify({
        comptes_id: 1,
        type: type,
        montant: 25000,   
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}




/* fonctions concernant la table profil */


export  function getFoundProfil(name){
      const url ='http://localhost:9000/api/v1/profil/find/'+name;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function loadingProfil(page){
      const url ="http://localhost:9000/api/v1/profil?page="+page;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function deleteProfil(id){
      const url ="http://localhost:9000/api/v1/profil/"+id;
      return fetch(url , {
              method: 'delete'
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function updateProfil(id,name){
      const url ="http://localhost:9000/api/v1/profil/"+id;
      return fetch(url ,{
      method: 'PUT',
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function addProfil(name){
      const url ="http://localhost:9000/api/v1/profil";
      return fetch(url ,{
      method: 'POST',
      body: JSON.stringify({
        name: name,  
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function allProfil(){
      const url ="http://localhost:9000/api/v1/profil/all/data";
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}


/* fonctions concernant la table Utilisateur */

export  function getFoundUser(text){
      const url ='http://localhost:9000/api/v1/users/find/'+text;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function loadingUser(page){
      const url ="http://localhost:9000/api/v1/users?page="+page;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function deleteUser(id){
      const url ="http://localhost:9000/api/v1/users/"+id;
      return fetch(url , {
              method: 'delete'
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function updateUser(id,name,surname,phone,email,id_card){
      const url ="http://localhost:9000/api/v1/users/"+id;
      return fetch(url ,{
      method: 'PUT',
      body: JSON.stringify({
        name: name,surname: surname,phone: phone,
        email: email,id_card: id_card
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function addUser(name,surname,id_card,password,email,profil_id,phone){
      const url ="http://localhost:9000/api/v1/users";
      return fetch(url ,{
      method: 'POST',
      body: JSON.stringify({
        name: name,surname: surname,id_card: id_card,
        password: password,email: email,
        profil_id: profil_id,phone:phone 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function allUser(){
      const url ="http://localhost:9000/api/v1/users/all/data";
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

/* fonctions concernant la table client */

export  function getFoundClient(text){
      const url ='http://localhost:9000/api/v1/clients/find/'+text;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function loadingClient(page){
      const url ="http://localhost:9000/api/v1/clients?page="+page;
      return fetch(url)
              .then((response) => response.json())
              .catch((error) => console.error(error))
}

export  function deleteClient(id){
      const url ="http://localhost:9000/api/v1/clients/"+id;
      return fetch(url , {
              method: 'delete'
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function updateClient(id,name,surname,phone,email,id_card,sexe){
      const url ="http://localhost:9000/api/v1/clients/"+id;
      return fetch(url ,{
      method: 'PUT',
      body: JSON.stringify({
        nom: name,prenom: surname,telephone: phone,
        email: email,id_card: id_card,sexe:sexe
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}

export  function addClient(name,surname,id_card,email,user_id,phone,sexe){
      const url ="http://localhost:9000/api/v1/clients";
      return fetch(url ,{
      method: 'POST',
      body: JSON.stringify({
        nom: name,prenom: surname,id_card: id_card,
        sexe: sexe,email: email,
        users_id: user_id,telephone:phone 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
       .then((response) => response.json())
       .catch((error) => console.error(error))
}
