import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header.component'
import Footer from './components/Footer.component'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <Router>
       <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          

        </Container>
          
      </main>
      
      <Footer />
    </Router>    
  )
}

export default App

