//
import styles from "./imagesPage.module.css";
import { useState, useRef } from "react";

export default function AddImage({
  imgTitle,
  setImgTitle,
  imgUrl,
  setImgUrl,
  album,
  addImage,
  imageToEdit,
  setImageToEdit,
  editImage,
}) {
  let titleRef = useRef();
  let urlRef = useRef();
  function handleAddition() {
    addImage(album, titleRef.current.value, urlRef.current.value);
    titleRef.current.value = "";
    urlRef.current.value = "";
  }

  function handleUpdate() {
    editImage(imageToEdit, album, titleRef.current.value, urlRef.current.value);
    setImageToEdit(null);
    titleRef.current.value = "";
    urlRef.current.value = "";
  }
  return (
    <div className={styles.add_image_outer_cont}>
      <h2>Add an Image</h2>
      <div className={styles.add_image_inner_cont}>
        <input
          type="text"
          placeholder="Title"
          ref={titleRef}
          value={imgTitle}
          onChange={(e) => setImgTitle(e.target.value)}
        />
        <br />
        <input
          type="url"
          placeholder="Image URL"
          ref={urlRef}
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
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
        <button
          style={{ backgroundColor: "blue" }}
          onClick={imageToEdit ? handleUpdate : handleAddition}
        >
          {imageToEdit ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
