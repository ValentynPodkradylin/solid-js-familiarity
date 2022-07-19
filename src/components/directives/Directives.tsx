import { createSignal, Show } from "solid-js";

const Directives = () => {
  const [show, setShow] = createSignal(false);

  return (
    <div class="modal" use:clickOutside={() => setShow(false)}>
      Some Modal
    </div>
  );
};

export default Directives;
