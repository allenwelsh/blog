import * as React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useStateCb } from "./common";
const Example: FC<any> = () => {
  // const [count, setCount] = useState(0);
  const getV = ()=>{
    console.log(111)
    return 1
  }
  // const [count1, setCount1] = useState(()=>{
  //   return  getV()
  // });

  const [count1, setCount1] = useState(getV);


  
  // const ref = useRef(2);
  // useEffect(() => {
  //   ref.current = count;
  // }); //每次都会执行
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(`You clicked ${ref.current} times`);
  //     console.log(`You clicked2 ${count} times`);
  //   }, 3000);
  // });
  return (
    <div>
      <h1>Now: {count1}</h1>
      <button
        onClick={() =>
          setCount1(9)
        }
      >
        Click me
      </button>
    </div>
  );
};

export default Example;
