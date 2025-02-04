//
import { useState, useEffect, useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import albumsData from "../albumsData.json";
import AlbumsPage from "./albumsComponents/albumsPage";
import ImagesPage from "./imagesComponents/imagesPage";

// firebase related imports
import { db } from "../firestoreInit";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

function reducer(albums, action) {
  const { type, payload } = action;
  switch (type) {
    case "Get_Albums":
      return payload.fetchedAlbums;
    case "Create_Album":
      return [{ id: payload.id, name: payload.name }, ...albums];
    case "Add_Image":
      const updatedAlbums = albums.map(async (a) => {
        if (a.name === payload.album.name) {
          a.images
            ? a.images.unshift({ title: payload.title, src: payload.src })
            : (a.images = [{ title: payload.title, src: payload.src }]);
        }
        return a;
      });
      return updatedAlbums;
    default:
      return albums;
  }
}

export default function MainBody() {
  // const [albums, setAlbums] = useState([...albumsData]);
  // const [albums, setAlbums] = useState([]);
  const [albums, dispatch] = useReducer(reducer, []);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const snapsot = await getDocs(collection(db, "albums"));

    const fetchedAlbums = snapsot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // setAlbums(fetchedAlbums);
    dispatch({ type: "Get_Albums", payload: { fetchedAlbums } });
  }

  useEffect(() => {
    selectedAlbum ? setIsAlbumClicked(true) : setIsAlbumClicked(false);
  }, [selectedAlbum]);

  async function createAlbum(name) {
    const existedAlbum = albums.find(
      (a) => a.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existedAlbum) {
      toast.error("Oops! Album already exists.");
      return;
    }

    // database operation
    const docRef = await addDoc(collection(db, "albums"), {
      name,
      createdAt: serverTimestamp(),
    });
    dispatch({ type: "Create_Album", payload: { id: docRef.id, name } });
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

  async function addImage(album, title, url) {
    const docRef = doc(db, "albums", album.id);
    await updateDoc(docRef, {
      images: [{ title, src: url }, ...(album.images || [])],
    });

    dispatch({ type: "Add_Image", payload: { album, title, src: url } });

    setSelectedAlbum({
      name: album.name,
      images: [{ title, src: url }, ...(album.images || [])],
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
