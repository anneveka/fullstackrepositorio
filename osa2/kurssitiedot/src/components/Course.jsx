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

export default Course