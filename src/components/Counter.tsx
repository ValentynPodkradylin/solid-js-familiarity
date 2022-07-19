import {
  createSignal,
  createEffect,
  createRenderEffect,
  onMount,
} from "solid-js";

interface PhotoInfo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function Counter() {
  const [count, setCount] = createSignal(0);
  const [photos, setPhotos] = createSignal<PhotoInfo[]>();

  createEffect(() => {
    console.log("запускаются после завершения рендеринга", count());
  });

  createRenderEffect(() => {
    console.log("запускаются до завершения рендеринга", count());
  });

  // deferred Signal (если этот сигнал не используется то он будет удален из компилированного кода Solid)
  const doubleCount = () => count() * 2;

  onMount(async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=20`
    );

    setPhotos(await res.json());
  });

  return <button onClick={() => setCount(count() + 1)}>Click Me</button>;
}
