import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import RecipeSearch from './pages/RecipeSearch'
import Header from './components/Header'

function App() {

  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      <Header
        open={open}
        setOpen={setOpen} />
      <main>
        <Switch>
          <Route exact path="/" component={RecipeSearch} />
        </Switch>
      </main>

    </div>
  );
}

export default App;