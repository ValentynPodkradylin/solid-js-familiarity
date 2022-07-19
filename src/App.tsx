import { Box, Center, HopeProvider } from "@hope-ui/solid";
import { Component } from "solid-js";
import { TodoJSONPlaceholderList } from "./components/TodoJSONPlaceholderList";

// Я использывал UI библиотеку Hope UI(https://hope-ui.com/docs/theming/customize-theme)

const App: Component = () => {
  return (
    <HopeProvider>
      <Box m={20}>
        <TodoJSONPlaceholderList />
      </Box>
    </HopeProvider>
  );
};

export default App;
