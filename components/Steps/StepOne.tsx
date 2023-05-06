import React from 'react'

interface IStepOneProps {
  children: React.ReactNode
}

const StepOne: React.FC<IStepOneProps> = (props) => {
  return <div>{props.children}</div>
}

export default StepOne
