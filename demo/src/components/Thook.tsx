import * as React from "react";
import { FC, useEffect, useState, useRef } from 'react';

interface Props {
}
const a = 1;


function useReducer(reducer: any, initialState: any) {
    const [state, setState] = useState(initialState);

    function dispatch(action: any) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}


const Thook: FC<Props> = ({ }) => {
    const setA = (p: any) => {
        return p + 1
    }
    const ref = useRef();

    const [count, setCount] = useState<any>(0);
    // const [count2, setCount2] = useState<any>(1);

    const prevCount = ref.current;
    const add = () => {
        // setTimeout(() => {
        //     setCount(2);
        //     console.log(111, count);
        //     setCount(3);
        //     console.log(1112, count);
        // }, 0);
        // setCount((p: any) => {
        //     return p + 1
        // });
        //@ts-ignore
        // ref.current =5
        // console.log(111, count);
        setCount(3);
        console.log(1112, count);
    }
    const latestCount = useRef(count);
    // useEffect(() => {
    //     // Set the mutable latest value
    //     latestCount.current = count;
    //     setTimeout(() => {
    //         // Read the mutable latest value
    //         console.log(`You clicked ${latestCount.current} times`);
    //         console.log(`You clicked ${count} times2`);

    //     }, 3000);
    // });
    useEffect(() => {
        // ref.current = count;
        // setCount2(count)
        console.log(1114, count)
    });
    // useEffect(() => {
    //     document.title = `You clicked ${count} times`;
    // });
    return (
        <div className="history">
            {
                console.log(1113, count)
            }
            <div>
                count {count}
            </div>
            <div>
                {/* prevCount{prevCount} */}
            </div>
            <div>
                {/* setCount2{count2} */}
            </div>

            <button onClick={add}>加一</button>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

export default Thook;
