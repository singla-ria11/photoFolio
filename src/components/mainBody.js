//
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import albumsData from "../albumsData.json";
import AlbumsPage from "./albumsComponents/albumsPage";
import ImagesPage from "./imagesComponents/imagesPage";

export default function MainBody() {
  const [albums, setAlbums] = useState([...albumsData]);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  //
  useEffect(() => {
    setAlbums([...albumsData]);
  }, []);

  useEffect(() => {
    selectedAlbum ? setIsAlbumClicked(true) : setIsAlbumClicked(false);
  }, [selectedAlbum]);

  function createAlbum(name) {
    const existedAlbum = albums.find(
      (a) => a.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existedAlbum) {
      toast.error("Oops! Album already exists.");
      return;
    }
    setAlbums([{ name }, ...albums]);
    toast.success("Album created successfully.");
  }

  function handleAlbumClick(clickedAlbum) {
    if (clickedAlbum) {
      setSelectedAlbum(clickedAlbum);
    }
  }

  //ImagesPage Component related functions
  function goBack() {
    setSelectedAlbum(null);
  }

  function addImage(album, title, url) {
    const updatedAlbums = albums.map((a) => {
      if (a.name === album.name) {
        a.images.unshift({ title, src: url });
      }
      return a;
    });
    setAlbums(updatedAlbums);
    setSelectedAlbum({
      name: album.name,
      images: [...album.images],
    });
    toast.success("Image added successfully.");
  }

  return (
    <>
      <ToastContainer />
      <div className="main-body-cont">
        {isAlbumClicked ? (
          <ImagesPage
            album={selectedAlbum}
            backToAlbumsPage={goBack}
            addImage={addImage}
          />
        ) : (
          <AlbumsPage
            albums={albums}
            createAlbum={createAlbum}
            handleAlbumClick={handleAlbumClick}
          />
        )}
      </div>
    </>
  );
}
