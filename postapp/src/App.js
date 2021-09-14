import { PostCreate } from "./components/PostCreate";
import { PostList } from "./components/PostList";

function App() {
  return (
    <div className="container">
      <h1 className="mx-1 mt-3 mb-4">PostApp</h1>
      <PostCreate />
      <hr  />
      <PostList />
    </div>
  );
}

export default App;
