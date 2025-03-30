import MainLayout from "@/layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
/**
 * The App component is the root component of our application. By wrapping the
 * MainLayout component with the App component, we can benefit from the following:
 *
 * 1. We can easily add global styles or scripts to the application by importing
 *    them in the App component.
 * 2. We can add global event listeners or setup global state management in the
 *    App component.
 * 3. We can easily switch between different layouts or templates by changing the
 *    component that is rendered by the App component.
 */

function App() {
  return (
    <>
    <Provider store={store}>
      <MainLayout />
    </Provider>
    </>
  );
}

export default App;
