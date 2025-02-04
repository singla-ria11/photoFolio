//
import styles from "./imagesPage.module.css";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";

export default function ImageCard({ image, index, openModel }) {
  return (
    <div
      className={styles.img_card_cont}
      onClick={() => {
        openModel(image, index);
      }}
    >
      <div className={styles.img_actions}>
        <img src={editIcon} className={styles.edit_icon} alt="edit icon" />
        <img
          src={deleteIcon}
          className={styles.delete_icon}
          alt="delete icon"
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
