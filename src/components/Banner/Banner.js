import React, { useState } from "react";
import "./_Banner.scss";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const items = [
  {
    src: "https://preview.colorlib.com/theme/cozastore/images/xslide-02.jpg.pagespeed.ic.__MQeyG5T4.webp",
    title: "Men Fashion Collection 2021",
    caption: "New Season",
  },
  {
    src: "https://preview.colorlib.com/theme/cozastore/images/xslide-03.jpg.pagespeed.ic.tP-L47NU9M.webp",
    title: "Men Collection",
    caption: "New Arrivals",
  },
  {
    src: "https://preview.colorlib.com/theme/cozastore/images/xslide-01.jpg.pagespeed.ic.tP-L47NU9M.webp",
    title: "Women Fashion Collection 2021",
    caption: "Fashion World",
  },
];

const BannerCarousel = (props) => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="caption">
          <h4>{item.title}</h4>
          <h3>{item.caption}</h3>
          <button className="button" onClick={() => history.push("/shop/all")}>
            Shop Now
          </button>
        </div>
        <img src={item.src} alt={item.altText} />
        {/* <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        >
          <Button>Shop now</Button>
        </CarouselCaption> */}
      </CarouselItem>
    );
  });

  return (
    <div className="BannerCarousel">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        >
          <i class="fas fa-caret-left"></i>
        </CarouselControl>
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
