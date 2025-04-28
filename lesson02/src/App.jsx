import React from 'react'
import List from './components/List-component/List'
import { animals } from './mockData'

function App() {
  return (
    <>
      <List animals={animals}/>
    </>
  )
}

export default App
