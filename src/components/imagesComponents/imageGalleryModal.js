//

import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import styles from "./imagesPage.module.css";

export default function ImageGalleryModal({
  images,
  currentIndex,
  handleLeft_arrow,
  handleRight_arrow,
  closeModel,
}) {
  const currentImage = images[currentIndex];
  return (
    <div className={styles.modal_overlay} onClick={closeModel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.img_arrow_cont}>
          <FaCircleChevronLeft
            className={styles.icon + " " + styles.left}
            onClick={handleLeft_arrow}
          />
          {/* <img src={curretImage.src} alt="left-arrow" /> */}
          <img src={currentImage.src} alt={currentImage.title} />
          {/* <img src={currentImage.src} alt="right-arrow" /> */}
          <FaCircleChevronRight
            className={styles.icon + " " + styles.right}
            onClick={() => handleRight_arrow(images)}
          />
        </div>
        <h2>{currentImage.title}</h2>
      </div>
    </div>
  );
}
