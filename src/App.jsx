import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Generator from './pages/Generator'
import Language from './pages/Language'
import Style from './pages/Style'
import Description from './pages/Description'
import Results from './pages/Results'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/generator"
          element={<Generator />}
        />

        <Route
          path="/generator/language"
          element={<Language />}
        />

        <Route
          path="/generator/style"
          element={<Style />}
        />

        <Route
          path="/generator/description"
          element={<Description />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App