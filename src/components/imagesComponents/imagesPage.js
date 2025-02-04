//
import styles from "./imagesPage.module.css";
import searchIcon from "../../images/search.png";
import crossIcon from "../../images/x-button.png";
import goBackIcon from "../../images/left.png";
import { useState, useRef } from "react";
import ImageCard from "./imageCard";
import AddImage from "./addImage";
import ImageGalleryModal from "./imageGalleryModal";

export default function ImagesPage({ album, backToAlbumsPage, addImage }) {
  const [imgAddition, setImgAddition] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [searchedImages, setSearchedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const searchInputRef = useRef();
  console.log("Selected Album", album);

  function handleAddImgBtn() {
    setImgAddition(imgAddition ? false : true);
  }
  function handleInputChange(e) {
    const searchedValue = e.target.value;
    console.log("searched value", searchedValue);

    if (searchedValue) {
      const filteredImages = album?.images.filter((img) =>
        img.title.toLowerCase().includes(searchedValue.trim().toLowerCase())
      );
      setSearchedImages(filteredImages);
    } else {
      setSearchedImages([]);
    }
  }

  function renderImageCards() {
    const imagesToRender = searchInputRef.current?.value
      ? searchedImages
      : album?.images;

    const imageCards = imagesToRender?.map((img, i) => (
      <ImageCard key={img.title} image={img} index={i} openModel={openModel} />
    ));
    return imageCards;
  }

  function openModel(img, index) {
    setIsModalOpen(true);
    setCurrentIndex(index);
  }

  function closeModel() {
    setIsModalOpen(false);
    setCurrentIndex(0);
  }

  function handleLeft_arrow() {
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }
  function handleRight_arrow(images) {
    if (currentIndex !== images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  return (
    <>
      <div className={styles.images_main_cont}>
        {imgAddition && <AddImage album={album} addImage={addImage} />}
        <div className={styles.images_top_cont}>
          <div className={styles.top_left_cont}>
            <img
              src={goBackIcon}
              alt="Back Icon"
              className={styles.backIcon}
              onClick={backToAlbumsPage}
            />
            <h2>Images inside {album && album.name}</h2>
          </div>
          <div className={styles.top_right_cont}>
            <div className={styles.searchCont}>
              <input
                className={`${styles.searchInput} ${
                  showSearchIcon
                    ? styles.hideSearchInput
                    : styles.showSearchInput
                }`}
                placeholder="Search Image..."
                ref={searchInputRef}
                onChange={handleInputChange}
              />
              <img
                src={showSearchIcon ? searchIcon : crossIcon}
                alt="Search Icon"
                className={
                  showSearchIcon ? styles.searchIcon : styles.crossIcon
                }
                onClick={() => {
                  if (showSearchIcon) {
                    setShowSearchIcon(false);
                  }
                  if (!showSearchIcon) {
                    setShowSearchIcon(true);
                  }
                  setSearchedImages([]);
                  searchInputRef.current.value = "";
                }}
              />
            </div>
            <button
              className={imgAddition ? styles.cancel_btn : styles.add_btn}
              onClick={handleAddImgBtn}
            >
              {imgAddition ? "Cancel" : "Add image"}
            </button>
          </div>
        </div>
        <div className={styles.images_list_cont}>{renderImageCards()}</div>
      </div>
      {isModalOpen && (
        <ImageGalleryModal
          images={album?.images}
          currentIndex={currentIndex}
          handleLeft_arrow={handleLeft_arrow}
          handleRight_arrow={handleRight_arrow}
          closeModel={closeModel}
        />
      )}
    </>
  );
}
