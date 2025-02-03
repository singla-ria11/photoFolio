//
import styles from "./imagesPage.module.css";

export default function ImageCard({ image, index, openModel }) {
  return (
    <div
      className={styles.img_card_cont}
      onClick={() => {
        openModel(image, index);
      }}
    >
      <div className={styles.thumbnail_cont}>
        <img src={image.src} alt={"thumbnail for " + image.title} />
        {/* <img src={thumbnail2} alt="album-thumbnail" /> */}
      </div>
      <h4>{image.title}</h4>
    </div>
  );
}
