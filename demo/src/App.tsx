import * as React from "react";
import { Tree, getMirrorTree } from "./Tree";
import { LinkedList } from "./LinkdedList";
import Example from "./hooks/index";
// import Redux from "./hooks/redux";
import Test2 from "./hooks/test2";
// import { threeSum } from "./tsTest";

export default class App extends React.Component<any> {
  componentDidMount() {
    // this.testLinkedList();
    // const nums = [-1, 0, 1, 2, -1, -4];
    // console.log(111, threeSum(nums));
  }
  // testLinkedList() {
  //   let list = new LinkedList(1, "1");
  //   let keys = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   for (let key of keys) {
  //     list.insert(key, `${key}`);
  //   }
  //   console.log(111, list.reverse());
  // }
  // testTree() {
  //   let tree = new Tree(1, {
  //     pos: "老大",
  //   });
  //   let keys = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   for (let key of keys) {
  //     tree.insert(key, {
  //       pos: `老${key}`,
  //     });
  //   }
  //   console.log(111, tree, getMirrorTree(tree));
  // }
  render() {
    return (
      <div>
        {/* <Redux /> */}
        <Example />
        {/* <Test2 /> */}
      </div>
    );
  }
}
