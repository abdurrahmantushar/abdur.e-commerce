import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {

  const user = useSelector(state => state.user)

  // যদি login না থাকে
  if (!user?._id) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute