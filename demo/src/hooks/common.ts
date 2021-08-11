
import { FC, useEffect, useRef, useState } from "react";

export const IMAGES = [
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/1.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/2.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/3.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/4.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/5.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/6.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/7.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/8.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/9.png",
    "http://cdn.gee4.cn/zw-wx/hz-wx-vue-img-v2/img/0417/10.png",
]

export const useLazyLoad = (ref: any) => {
    const ioRef = useRef()

    useEffect(() => {
        console.log(11111, ref.current)

        // let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        // entries.forEach((entry, index) => {
        //     let lazyImage: any = entry.target;
        //     // 相交率，默认是相对于浏览器视窗

        //     if (entry.intersectionRatio > 0) {
        //         lazyImage.src = lazyImage.dataset.src;
        //         // 当前图片加载完之后需要去掉监听
        //         lazyImageObserver.unobserve(lazyImage);
        //     }
        // });
        //@ts-ignore
        ioRef.current = new IntersectionObserver((entries) => { // 观察者
            entries.forEach((item) => { // entries 是被监听的dom集合，是一个数组
                if (item.intersectionRatio <= 0) return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
                const { target } = item
                //@ts-ignore
                target.src = target.dataset.src // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
            })

        }, {
            threshold: [1] // 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。
        });
        //@ts-ignore
        ioRef.current.observe(ref.current);
        return () => {
            //@ts-ignore
            ioRef.current.disconnect(); // 关闭观察器
        }
    }, []);
};

export const useIntersectionObserver = (domList: [], deps = [0]) => {
    // 接收两个参数，dom元素的class和指定交叉比例(threshold)的依赖项
    const ioRef = useRef()
    useEffect(() => {
        //@ts-ignore
        ioRef.current = new IntersectionObserver((entries) => { // 观察者
            entries.forEach((item) => { // entries 是被监听的dom集合，是一个数组
                if (item.intersectionRatio <= 0) return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
                const { target } = item
                //@ts-ignore
                target.src = target.dataset.src // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
            })
        }, {
            threshold: deps // 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。
        });
        //@ts-ignore
        domList.forEach(item => ioRef.current.observe(item)); // observe 开始观察，接受一个DOM节点对象
        return () => {
            //@ts-ignore
            ioRef.current.disconnect(); // 关闭观察器
        }
    }, [])

}

export const useStateCb = (init: any) => {
    const [count, setCount] = useState(init);
    const ref: any = useRef();
    useEffect(() => {
        ref.current && ref.current(count)
    }, [count])

    const mySetCount = (value: any, cb: any) => {
        setCount(value);
        ref.current = cb;
    }
    return [count, mySetCount]
}

const actionType = {
    INSREMENT: 'INSREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
}


export const add = (value: number) => {
    return {
        type: actionType.INSREMENT,
        payload: value
    }
}

export const dec = (value: number) => {
    return {
        type: actionType.DECREMENT,
        payload: value
    }
}

export const init = {
    count: 0
}

export const reducer = (state: any, action: any,) => {
    switch (action.type) {
        case actionType.INSREMENT:
            return { count: state.count + action.payload };
        case actionType.DECREMENT:
            return { count: state.count - action.payload };
        default:
            throw new Error();
    }

}