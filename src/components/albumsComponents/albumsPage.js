//
import styles from "./albumsData.module.css";
import { useState } from "react";
import AlbumCard from "./albumCard";
import CreateAlbum from "./createAlbum";

export default function AlbumsPage({ albums, createAlbum, handleAlbumClick }) {
  const [albumCreation, setAlbumCreation] = useState(false);

  function handleAddAlbumBtn() {
    setAlbumCreation(albumCreation ? false : true);
  }
  console.log(albums);

  return (
    <div className={styles.albums_main_cont}>
      {albumCreation && <CreateAlbum createAlbum={createAlbum} />}

      <div className={styles.albums_top_cont}>
        <h2>Your Albums</h2>
        <button
          onClick={handleAddAlbumBtn}
          className={albumCreation ? styles.cancel_btn : styles.add_btn}
        >
          {albumCreation ? "Cancel" : "Add Album"}
        </button>
      </div>
      <div className={styles.albums_list_cont}>
        {albums.map((album) => (
          <AlbumCard
            key={album.name}
            album={album}
            handleAlbumClick={handleAlbumClick}
          />
        ))}
      </div>
    </div>
  );
}
