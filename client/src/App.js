import React, { Suspense, lazy } from 'react';
import { Switch, Route } from "react-router-dom";
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header';
const Giphy = lazy(() => import("./components/giphy/giphy.components"));
const Reddit = lazy(() => import("./components/reddit/reddit.components"));



const App = () => (
  <div>
    <Header path={window.location.href} />
    <Switch>
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={Reddit} />
        <Route exact path="/giphy" component={Giphy} />
        <Route exact path="/reddit" component={Reddit} />
        <Route component={Reddit} />
        <Route path='*' component={Reddit} />
      </Suspense>
    </Switch>
  </div>
);

export default App;
