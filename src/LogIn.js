import React from "react";
import Button from "./Button";
import { ThemeContextConsumer } from "./themeContext";

function LogIn(props) {
  return (
    <ThemeContextConsumer>
      {context => (
        <div>
          <Button/>
        </div>
      )}
    </ThemeContextConsumer>
  );
}

export default LogIn;
LogIn.contextType = ThemeContextConsumer;