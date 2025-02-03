//
import styles from "./imagesPage.module.css";
import { useRef } from "react";

export default function AddImage({ album, addImage }) {
  let titleRef = useRef();
  let urlRef = useRef();
  function handleAddition() {
    addImage(album, titleRef.current.value, urlRef.current.value);
    titleRef.current.value = "";
    urlRef.current.value = "";
  }
  return (
    <div className={styles.add_image_outer_cont}>
      <h2>Add an Image</h2>
      <div className={styles.add_image_inner_cont}>
        <input type="text" placeholder="Title" ref={titleRef} />
        <br />
        <input type="url" placeholder="Image URL" ref={urlRef} />
        <br />
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            titleRef.current.value = "";
            urlRef.current.value = "";
          }}
        >
          Clear
        </button>
        <button style={{ backgroundColor: "blue" }} onClick={handleAddition}>
          Create
        </button>
      </div>
    </div>
  );
}
