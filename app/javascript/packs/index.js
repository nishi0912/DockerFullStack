// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../components/App";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "../Utils/history";
import "../../assets/stylesheets/application.css";

// const history = useHistory();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body.appendChild(document.createElement("div"));

  const container = ReactDOM.createRoot(root);

  container.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
});
