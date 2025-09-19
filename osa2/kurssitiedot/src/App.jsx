const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {
  const {course} = props
  return (
    <div>
      <Header course={course.name}/>
      <Content course={course}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
    return (
      <div>
        <h1>Header {props.course}</h1>
      </div>
    )
}

const Content = (props) => {
  const {course} = props  
  return (
    <div>
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
    </div>
  )

}

const Part = ({part}) => {
  return(
    <li>{part.name} {part.exercises} </li>
  )
}

export default App