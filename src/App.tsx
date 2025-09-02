import Login from "./components/Login"
import UserList from "./components/UserList"

function App() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Frappe React SDK Demo</h1>
      <Login />
      <UserList />
    </div>
  )
}

export default App
