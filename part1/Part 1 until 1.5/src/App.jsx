const Header = (props) =>{
  console.log(props)
 return <h1>{props.course}</h1>
}

const Part = (props) =>{
  return <p>{props.part} {props.exercise}</p>
}

const Content = (props) => {
  const partsArray = props.parts
  return (
  <>{
    partsArray.map((part, index)=><Part key={index} part={part.name} exercise={part.exercises}/>)
  }</>
  )
}

const Total = (props) =>{
  const parts = props.parts
  const sum = parts.map((part)=>part.exercises).reduce((a,b)=>a+b);
  return <p>{sum}</p>
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App