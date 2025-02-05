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
  arrayRemove,
  getDoc,
} from "firebase/firestore";

function reducer(albums, action) {
  const { type, payload } = action;
  switch (type) {
    case "Get_Albums":
      return payload.fetchedAlbums;
    case "Create_Album":
      return [{ id: payload.id, name: payload.name }, ...albums];
    case "Add_Image": {
      const updatedAlbums = albums.map((a) => {
        if (a.name === payload.album.name) {
          a.images
            ? a.images.unshift({ title: payload.title, src: payload.src })
            : (a.images = [{ title: payload.title, src: payload.src }]);
        }
        return a;
      });
      return updatedAlbums;
    }
    case "Edit_Image": {
      const { imageToEdit, album, title, src } = payload;
      const albumIndex = albums.findIndex((a) => a.id === album.id);
      const imageIndex = albums[albumIndex].images.indexOf(imageToEdit);
      albums[albumIndex].images[imageIndex].title = title;
      albums[albumIndex].images[imageIndex].src = src;
      return [...albums];
    }
    case "Delete_Image": {
      const { selectedAlbum, image } = payload;
      const albumIndex = albums.findIndex((a) => {
        return a.id === selectedAlbum.id;
      });
      const imageIndex = albums[albumIndex].images.indexOf(image);
      albums[albumIndex].images.splice(imageIndex, 1);
      return [...albums];
    }
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
      console.log(clickedAlbum);
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
      images: [
        { title, src: url, createdAt: new Date() },
        ...(album.images || []),
      ],
    });

    dispatch({ type: "Add_Image", payload: { album, title, src: url } });

    const updatedAlbum = await getDoc(doc(db, "albums", album.id));
    setSelectedAlbum({ id: docRef.id, ...updatedAlbum.data() });
    // setSelectedAlbum({
    //   id: album.id,
    //   name: album.name,
    //   images: [{ title, src: url }, ...(album.images || [])],
    // });
    toast.success("Image added successfully.");
  }

  async function editImage(imageToEdit, album, title, url) {
    // update Database
    const editedImage = { ...imageToEdit, title, src: url };
    const docRef = doc(db, "albums", album.id);
    const snapsot = await getDoc(docRef);
    const updatedImages = snapsot
      .data()
      .images.map((img) => (img.src === imageToEdit.src ? editedImage : img));
    await updateDoc(docRef, {
      images: updatedImages,
    });

    dispatch({
      type: "Edit_Image",
      payload: { imageToEdit, album, title, src: url },
    });
    toast.success("Image edited successfully.");
  }

  async function deleteImage(image) {
    console.log("From delete function", albums);

    const docRef = doc(db, "albums", selectedAlbum.id);
    await updateDoc(docRef, {
      images: arrayRemove(image),
    });

    dispatch({
      type: "Delete_Image",
      payload: { selectedAlbum, image },
    });

    const updatedAlbum = await getDoc(doc(db, "albums", selectedAlbum.id));
    setSelectedAlbum({ id: docRef.id, ...updatedAlbum.data() });
    toast.success("Image deleted successfully.");
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
            editImage={editImage}
            deleteImage={deleteImage}
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
