
const Course = ({course}) => {

    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)
    
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part)=>{
        return <p key={part.id}>{part.name} {part.exercises}</p>
      })}
      <strong>total of {totalExercises} exercises </strong>
    </div>
  )
}

export default Course
