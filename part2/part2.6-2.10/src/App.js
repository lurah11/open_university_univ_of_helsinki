import {useState} from 'react'

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

const Record = (props) => {
  const result = props.res
  return (
    <ul>
    {result.map(person=>
      <li key={person.name}>{person.name}---{person.number}</li>
    )}
</ul>
  )
}





const App = () => {
  const [persons,SetPersons] = useState([
    {
      'name':'Agustinus',
      'number':'08123456'
    },
    {
      'name':'Batubara',
      'number':'081222344'
    },
    {
      'name':'Lurah',
      'number':'082342390'
    },
    {
      'name':'Tampan',
      'number':'085746253838'
    }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const[newSearch,setNewSearch] = useState('')

  const personsForFilter = [...persons]
  const[newFilterResult,setNewFilterResult] = useState(
      personsForFilter
  )




  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    if (persons.filter((person)=>person.name===newName).length > 0 ) {
      alert(`${newName} is already in the phone book ,,, too sad for you!`)
      setNewName('')
      setNewNumber('')
      setNewSearch('')
      
    }
    else {
      const new_object = persons.concat({'name':newName,'number':newNumber})
      SetPersons(new_object)
      setNewName('')
      setNewNumber('')
      setNewSearch('')
      setNewFilterResult(new_object)
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
