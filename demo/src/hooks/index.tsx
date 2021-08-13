import * as React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useStateCb } from "./common";
const Example: FC<any> = () => {
  // const [count, setCount] = useState(0);
  const getV = () => {
    // console.log(0);
    return 1;
  };
  // const [count1, setCount1] = useState(()=>{
  //   return  getV()
  // });

  const [count1, setCount] = useState(getV);

  // const ref = useRef(2);
  // useEffect(() => {
  //   ref.current = count;
  // }); //每次都会执行
  useEffect(() => {
    // setInterval(() => {
    //   // console.log(`You clicked ${ref.current} times`);
    //   setCount((pre) => {
    //     console.log(`You clicked2 ${pre} times`);
    //     return pre + 1;
    //   });
    // }, 3000);
    // console.log(11, count1);
    // return () => {
    //   console.log(222, count1);
    // };
    // const id = setInterval(() => {
    //   // setCount((pre) => pre + 1);
    //   setCount(count1 + 1);
    // }, 1000);
    // return () => clearInterval(id);
    console.log(222, count1);
  }, [count1]);
  const clicK = () => {
    // setCount((pre) => pre + 1);
    setCount((pre) => pre + 1);
  };
  return (
    <div>
      <h1>Now: {count1}</h1>
      <button onClick={clicK}>Click me</button>
    </div>
  );
};

export default Example;
