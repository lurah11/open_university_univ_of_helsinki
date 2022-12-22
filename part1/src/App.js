const Header = (props) => {
  return(<h1>{props.crs.name}</h1>)
}

const Part = (props) => {
  return (<p>{props.parts.course} {props.parts.exercise}</p>)
}

const Content = (props) => {
  const coursePart = props.crs.parts
  
   return (
      <div>
        <Part parts={coursePart[0]} />
        <Part parts={coursePart[1]} />
        <Part parts={coursePart[2]} />
      </div>
  )
}

const Total = (props) => {
  const parts = props.crs.parts 
  let total = 0
  parts.forEach(part => {
    total += parseInt(part.exercise)
  }
  

  )
  return (<p>Number of exercise {total}</p>)
}



const App = () => {
  const course = {
    'name':'Half Stack Application Development',
    'parts': [
          {'course':'Fundamentals of React',
          'exercise':'10',
          },
        {'course':'Using props to pass data',
         'exercise':7,  
        },
        {
          'course':'State of a component',
          'exercise':14
        }
    ]
  }

  return (
    <div>
      <Header  crs={course} />
      <Content crs={course} />
      <Total crs={course} />
    </div>
)
}




export default App;
