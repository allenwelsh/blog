import * as React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useLazyLoad, useIntersectionObserver, IMAGES } from "./common";
const style = {
  display: "block",
  width: "300px",
  height: "1000px",
};
const RenderImage: FC<any> = ({ img }) => {
  const elementRef = useRef();
  useLazyLoad(elementRef);
  return (
    <div>
      <img data-src={img} alt="" ref={elementRef} style={style} />
    </div>
  );
};

const Test2: FC<any> = () => {
  return (
    <div>
      {/* <p>1111</p> */}
      {IMAGES.map((img, index) => {
        return <RenderImage img={img} key={index} />;
      })}
    </div>
  );
};

const Test = () => {
  const domRef = useRef([]);
  //@ts-ignore
  useIntersectionObserver(domRef.current, [1]);

  return (
    <>
      {IMAGES.map((item, index) => (
        <img
          key={`lazy-${index}`}
          className="avatar-img"
          data-src={item}
          style={style}
          ref={(el) => (domRef.current[index] = el)}
        />
      ))}
    </>
  );
};

export default Test2;
