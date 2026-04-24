import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/Intro/IntroPage'
import HomePage from './pages/Home/HomePage'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  if (!introComplete) {
    return <IntroPage onComplete={() => setIntroComplete(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
