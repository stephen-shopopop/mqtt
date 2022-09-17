import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Welcome to `DEMO MQTT`. Try updating this message in the
        ./routes/index.tsx file, and refresh.
      </p>
      <Counter start={3} />

      <ul>
        <li>
          <a href="/you">link: hello you</a>
        </li>
        <li>
          <a href="/api/joke">link: api/joke</a>
        </li>
      </ul>
    </div>
  );
}
