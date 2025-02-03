//
import styles from "./albumsData.module.css";
import thumbnail1 from "../../images/thumbnail-1.png";
import thumbnail2 from "../../images/thumbnail-2.png";

export default function AlbumCard({ album, handleAlbumClick }) {
  return (
    <div
      className={styles.album_card_cont}
      onClick={() => {
        handleAlbumClick(album);
      }}
    >
      <div className={styles.thumbnail_cont}>
        <img src={thumbnail1} alt="album-thumbnail" />
        {/* <img src={thumbnail2} alt="album-thumbnail" /> */}
      </div>
      <h3>{album.name}</h3>
    </div>
  );
}
