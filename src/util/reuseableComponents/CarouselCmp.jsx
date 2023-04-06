import React from "react";
import Carousel from "react-bootstrap/Carousel";

/**
 * CarouselCmp shows the list of images associated with a post.
 * @param images The images for a post
 * @returns returns a slider that slides through all the post images
 */
export default function CarouselCmp({ images }) {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={image} style={{ height: "400px" }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
