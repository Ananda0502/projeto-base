import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='corpo'> 

    
    <div className='container' id="container">
      <nav className="navbar navbar-expand-lg menu">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Produtos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Quem Somos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Fale Conosco</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
   
      <footer>
        <Link to={'/login'}
          className='btn btn-sm btn-warning'>
          Acesso Restrito
        </Link>
      </footer>
    </div>
    </div>
  )
}

export default App
