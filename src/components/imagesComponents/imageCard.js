//
import styles from "./imagesPage.module.css";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";

export default function ImageCard({
  image,
  index,
  openModel,
  setImageToEdit,
  populateAddImgForm,
  deleteImage,
}) {
  return (
    <div
      className={styles.img_card_cont}
      onClick={() => {
        openModel(image, index);
      }}
    >
      <div
        className={styles.img_actions}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={editIcon}
          className={styles.edit_icon}
          alt="edit icon"
          onClick={() => {
            setImageToEdit(image);
            populateAddImgForm(image);
          }}
        />
        <img
          src={deleteIcon}
          className={styles.delete_icon}
          alt="delete icon"
          onClick={() => deleteImage(image)}
        />
      </div>
      <div className={styles.thumbnail_cont}>
        <img src={image.src} alt={"thumbnail for " + image.title} />
        {/* <img src={thumbnail2} alt="album-thumbnail" /> */}
      </div>
      <h4>{image.title}</h4>
    </div>
  );
}
