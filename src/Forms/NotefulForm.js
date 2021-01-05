import React from 'react'


function NotefulForm(props) {
  const {className, ...theProps} = props
  return (
    <form
      className={['NotefulForm', className].join(' ')}
      action='#'
      {...theProps}
    />
  )
}


export default NotefulForm