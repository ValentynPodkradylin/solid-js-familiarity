import { Box, Button, HStack, Input } from "@hope-ui/solid";
import { Component, createResource, createSignal, Show } from "solid-js";

interface TodoJSONPlaceholderListProps {}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type UserId = number;

const fetchUser = async (id: number): Promise<Todo> =>
  (await fetch(`https://jsonplaceholder.typicode.com/todos/${id}/`)).json();

export const TodoJSONPlaceholderList: Component<
  TodoJSONPlaceholderListProps
> = (props) => {
  const {} = props;
  const [userId, setUserId] = createSignal<UserId>();
  // Сигнал для работы с асинхронными запросами, как react-query(скоро выйдет и для Solid)
  const [user, { mutate, refetch }] = createResource<Todo, UserId>(
    userId,
    fetchUser
  );

  return (
    <Box display={"flex"} flexDirection="column">
      <HStack gap={10}>
        <Input
          type="number"
          min="1"
          w="500px"
          placeholder="Enter Numeric Id"
          onInput={(e) => setUserId(Number(e.currentTarget.value))}
        />
        <Button colorScheme={"accent"} onClick={refetch}>
          Refresh
        </Button>
      </HStack>
      {/* Control flow - очень крутая штука(комоненты для произвоидительной реактивности). 
        For, Show, Index... */}
      <Show when={user.loading}>
        <Box as="span" m={5} fontWeight="600">
          "Loading..."
        </Box>
      </Show>
      <Show when={user.error}>
        <Box as="span" m={5} fontWeight="600">
          "Empty..."
        </Box>
      </Show>
      <Show when={!user.error && !user.loading}>
        <Box>
          <pre>{JSON.stringify(user(), null, 2)}</pre>
        </Box>
      </Show>
    </Box>
  );
};
