import React from 'react'

const SearchedProviders = ({ businessphoto, companyname, address, phone }) => {
  return (
    <div className="media p-3">
      {/* <a href={`/profile/${}`}> */}
        <img className="img-thumbnail align-self-start mr-2 mb-1" src={businessphoto} alt={businessphoto} />
        <div className="media-body">
          <div className="companyname">{companyname}</div>
          <small className="text-muted">{address}, {phone}</small>
        </div>
      {/* </a> */}
    </div>
  )
}

export default SearchedProviders