import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import randomBytes from "randombytes";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import * as process from "process";
import store from "./app/store";
import { Provider } from "react-redux";
import "./index.css";

if (typeof global === "undefined") {
  var global = window;
}
// Định nghĩa process trong môi trường trình duyệt
window.process = {
  env: {
    NODE_ENV: "production", // hoặc 'development' tùy thuộc vào môi trường của bạn
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
