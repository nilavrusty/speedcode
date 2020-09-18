import React from 'react'

const SearchInput = ({ value, change }) => {
    return <input type="text" value={value} onChange={(e) => { change(e.target.value) }} />
}

export default SearchInput;