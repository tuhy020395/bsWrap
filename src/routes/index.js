import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@common/axiosClients";
import Login from "@components/sell";

const listRoute = [
  "/docs",
  "/faq",
  "/introduction",
  "/tokenomics",
  "/roadmap",
  "/",
];
// if (listRoute.find(x => x === window.location.pathname)) {
//   document.getElementById('trading').disabled = true;
// }
const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <iframe width="100%" height="100%" src="/home.html" title="home" />
          )}
        />

        {/* group routes handle login/reigster ... for user */}
        <Route path="/buy-token" component={() => <Login />} />
       
        {/* group landing page */}
        {listRoute.map((item) => (
          <Route
            key={item}
            path={`${item}`}
            component={() => (
              <iframe
                width="100%"
                height="100%"
                src={`${item}.html`}
                title={item}
              />
            )}
          />
        ))}

        {/* page not found */}
        <Route
          path="*"
          component={() => {
            return <iframe src="/404.html" title="404" />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
