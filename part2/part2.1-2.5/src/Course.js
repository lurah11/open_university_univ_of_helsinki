const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
      
      return (
        <li>{props.contents.name} : {props.contents.exercises}</li>
      )
  }
  
  const Stat =(props) => {
    const contents= props.contents
    let total = 0  //this one i will use map 
    contents.map(ctn => {
      total += ctn.exercises 
    }
    )
  
    //now try to use reduce
    
     const total2 = contents.reduce((total,curr)=>{  
        return total += curr.exercises
    },0)
  
   
    return (
      <h4>Total of {total2} exercises</h4>
    )
  }
  
  const Content = (props) => {
    const contents = props.content
    const parentkey = props.parentkey
    return (
      <div>
        <ul>
         {contents.map(ctn => 
           <Part key={parentkey+"_"+ctn.id} contents={ctn} /> //{parentkey+"_"+ctn.id}
         )}
         
        </ul>
        <Stat key={"stat_"+parentkey} contents={contents} />
      </div>
     )
    
  }
  
  
  
  const Course = (props) => {
    const courseList=props.props
    return (
      <div>
            { courseList.map( course => 
            <div>
              <Header key={'header'+"_"+course.id}  name ={course.name}  parentkey={'header'+"_"+course.id} />
              <Content key={'content'+"_"+course.id}  content = {course.parts} parentkey={'content'+"_"+course.id} />
            </div>
          )
          }     
      </div>
        )
  }

  export default Course