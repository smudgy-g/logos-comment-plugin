import './App.css'
import { useAuth } from './context/auth';

function App() {
  const {user, signIn, signOut} = useAuth()
  
  

  console.log(window.location.href, window.location)

  if (user) {
    return (
      <div  className="App">
        <h1>Hello, {user.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    )
  }
  return (
    <div  className="App">
      <h1>Sign in using Github OAuth</h1>
      <button  onClick={signIn}>Sign In</button>
    </div>
  )
}

export default App
