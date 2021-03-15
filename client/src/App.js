import { Route, Switch } from 'react-router-dom'

import RecipeSearch from './pages/RecipeSearch'

function App() {

  return (
    <div className="App">
      <h1>Test</h1>
      <main>
        <Switch>
          <Route exact path="/" component={RecipeSearch} />
        </Switch>
      </main>

    </div>
  );
}

export default App;