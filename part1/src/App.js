const Hello = (props) => {
  return (
    <h3>HELLO AGUS {props.name} you are {props.age} years old </h3>
  )
}

const App = () => { 
  const now = new Date(); 
  const a = 10; 
  const b = 20; 
  const nama = "tampan"
 return (<div>
    <p>Hello World, it is {now.toString()} </p>
    <p>{a} plus {b} is {a+b}</p>
    <Hello name="agustinus batubara" age="100" />
   <Hello name={nama} age = {a+b} />
  </div>)
}
  
export default App
