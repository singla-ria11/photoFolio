//
import styles from "./albumsData.module.css";
import { useRef } from "react";

export default function CreateAlbum({ createAlbum }) {
  let inputref = useRef();
  function handleCreation() {
    createAlbum(inputref.current.value);
    inputref.current.value = "";
  }
  return (
    <div className={styles.create_album_outer_cont}>
      <h2>Create Album</h2>
      <div className={styles.create_album_inner_cont}>
        <input type="text" placeholder="Album Name" ref={inputref} />
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => (inputref.current.value = "")}
        >
          Clear
        </button>
        <button style={{ backgroundColor: "blue" }} onClick={handleCreation}>
          Create
        </button>
      </div>
    </div>
  );
}
