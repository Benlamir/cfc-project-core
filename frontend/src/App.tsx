import { useState, useEffect } from 'react'
// import api from './services/api'

function App() {
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    // Test simple pour voir si le backend répond (nécessite un endpoint public ou gestion erreur)
    // Ici on affiche juste l'interface
    setMessage('Bienvenue sur le CFC')
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          CFC Project 🎓
        </h1>
        <p className="text-gray-700 mb-4">
          {message}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Se connecter
        </button>
      </div>
    </div>
  )
}

export default App
