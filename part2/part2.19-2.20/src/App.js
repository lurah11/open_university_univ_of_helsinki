import {useState} from 'react'
import {useEffect} from 'react'

import phone from './services/phone'

import './index.css'


const Filter = (props) => {
  return (
    <div>
    Search By Name : <input value={props.newSearch}  onChange={props.change} />
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleAdd}>
        <div>
          name: <input  value={props.newName} onChange={props.handleChange} />
        </div>
        <div>
          number: <input  value={props.newNumber} onChange={props.handleChangeNum} />
        </div>
        <div>
          <button  type="submit">Add</button>
        </div>
      </form>
  )
}
const handleDelete= (event) => {
  let valueName = event.target.name
  let id = event.target.value 
  let confirmation = window.confirm(`Are you sure want to delete ${valueName} from database?`)
  if (confirmation) {
    phone.del(id).then(data=>{
      alert(`${valueName} has been deleted from database`)
      window.location.reload()      

    })
  }
}
  

const Record = (props) => {
  const result = props.res
  return (
    <ul>
    {result.map(person=>
      <li key={person.name}>{person.name}---{person.number} <button name = {person.name} value={person.id} onClick={handleDelete}>delete</button></li>
    )}
</ul>
  )
}

const Notification = (props) => {
  const err = props.err 
  const suc = props.suc 
  console.log(err)
  console.log(suc)

  if (err){
    return (
    <div className="error">
        {err}
    </div>
    )
  }
  else if (suc) {
    return (
      <div className="success">
        {suc}
      </div>
    )

  }

}







const App = () => {
  const [persons,SetPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const[newSearch,setNewSearch] = useState('')
  const[newFilterResult,setNewFilterResult] = useState([])
  const[errorMsg,setErrorMsg] = useState(null)
  const[successMsg,setSuccesMsg] = useState(null)


    
  useEffect(()=>{
      phone.getAll().then(data=> {
        SetPersons(data)
        setNewFilterResult(data) 
      
      })
   
    },[])
  





  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    if (persons.filter((person)=>person.name===newName).length > 0 ) {
      let confirmation = window.confirm(`${newName} is already in the phone book ,,, Would you like to replace the phone number with the new one?`)
      
      if (confirmation) {
        let newObj = persons.filter(person=>person.name===newName)[0]
        let updatedObj = {
          'id':newObj.id,
          'name':newName,
          'number':newNumber
        }

        
        phone.update(updatedObj.id,updatedObj).then((response)=> {
          setSuccesMsg("DATA HAS BEEN SUCCESSFULLY UPDATED!!!!!!")
          setTimeout(()=>{
            setSuccesMsg(null)
          },5000)
          phone.getAll().then(data=> {
             SetPersons(data)
             setNewFilterResult(data)
          })

        }).catch(error=> {
          setErrorMsg(`${updatedObj.name} has been removed from database :(`)

          setTimeout(()=>{
            setErrorMsg(null)
          },5000)
          phone.getAll().then(data=> {
            SetPersons(data)
            setNewFilterResult(data)
         })
        })

        }
      }
      
    
    else {
      const objToBeSent = {'name':newName, 'number':newNumber}    
      setNewName('')
      setNewNumber('')
      setNewSearch('')
      
      //send data to the server      
      
      phone.create(objToBeSent).then(data=>{
        let newObj = persons.concat({
          'name':data.name,
          'number':data.number
        })
        setNewFilterResult(newObj)
        SetPersons(newObj) 
      })

      
    }
  }
  const handleChangeNum = (event) => {
    setNewNumber(event.target.value)
  }
  
  const myFilter = (person,search) => {
    persons.filter()
  }

  const handleChangeSearch = (event) => {
    const new_val = event.target.value
    setNewSearch(new_val)
    // console.log(`event ${event.target.value}`)
    // console.log(newSearch)
    // console.log(event.target.value===newSearch)
    if (new_val=='') {
      const personss = [...persons]
      setNewFilterResult(personss)
    }
    else {
      const filtered = newFilterResult.filter(person => {
        return person.name.includes(new_val)
      }
      )
      setNewFilterResult(filtered)
    }   
  }
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification err={errorMsg} suc={successMsg} />
      <Filter value={newSearch} change={handleChangeSearch} />
      <PersonForm handleAdd={handleAdd} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChangeNum={handleChangeNum} />
      <h2>
        Numbers
      </h2>
      <Record res={newFilterResult} /> 
    </div>
  )
  
}


export default App;
