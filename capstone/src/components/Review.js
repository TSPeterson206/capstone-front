import React from 'react'

function Review({id, content, rating}){


  return(
    <div>
      {content}
      {rating}
    </div>
  )
}
export default Review