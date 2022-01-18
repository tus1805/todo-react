import React from 'react'
import Input from '../../components/Form'

const SignIn = () => {
  return (
    <body>
      <div class="form-container">
        <form name="signUpForm" onsubmit="onSubmitForm()">
          <h1>Sign In</h1>
          <div class="form-group">
            <label for="username">User name:</label>
            <input id="username" type="text" oninput="handleUsernameMessage()" />
            <span id="username-error-message" class="error-message"></span>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input id="password" type="password" oninput="handlePasswordMessage()" />
            <span id="password-error-message" class="error-message"></span>
          </div>
          <button type="submit">Sign in</button>
          <div class="checkbox-group">
            <input type="checkbox" name="remember" id="remember"></input>
            <label for="remember">Remember account</label>
          </div>
          <a href="/sign-up">Sign up now</a>
        </form>
      </div>
      <script src="script-signin.js"></script>
      <Input
      
      />
    </body>
  )
}

export default SignIn
