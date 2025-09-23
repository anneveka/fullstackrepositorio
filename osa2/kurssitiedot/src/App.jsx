const App = () => {
   const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
          <Course key={course.id} course={course}/>
        )}
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
      <Total part={course.parts}/>
    </div>
  )

}

const Part = ({part}) => {
  return(
    <li>{part.name} {part.exercises} </li>
  )
}

const Total = (props) => {
    const {part} = props

    const a = 0
    const summa = part.reduce(
      (summaNyt, seuraava) => summaNyt + seuraava.exercises, a,
    )

    return (
      <div>
        <p><b>total of {summa} exercises</b></p>
      </div>
    )
}

export default App