import * as React from "react";
import Thook from './Thook'

interface HelloProps { compiler: string; framework: string; }
interface LabeledValue {
    label: string;
}

interface Overloaded {
    (foo: string): string;
    (foo: number): number;
}
// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello3 ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;


interface Something<T> {
    name: T;
}

type someT = string;


interface getName {
    (id: string): string
}



// class List{
//     private data:Array<string> = [];
//     public push (item:string){
//         this.data.push(item)
//     }
// }


// class List {
//     private data: Array<any> = [];
//     public push(a: any) {
//         this.data.push(a)
//     }
// }

class List<T>{
    private data: Array<T> = [];
    public push(item: T) {
        this.data.push(item)
    }
}
function backValue<T>(arg: T): T {
    return arg;
}


interface GenericIdentityFn<T> {
    (arg: T): T;
}

// function identity(arg) {
//     return arg;
// }
interface HelloState { index: number; }


export class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props)
        this.state = {
            index: 1
        }
    }

    componentDidMount() {
        // 使用
        // const str = overloaded(''); // str 被推断为 'string'
        // const num = overloaded(123); // num 被推断为 'number'
        // console.log(str, num)
        // let x: Something<number>;
        // let y: Something<string>;
        // x.name = 1
        // y.name = '1'

        // console.log(x, y, typeof x)
        // console.log(111, this._getName('2'))
        // let a = new List<string>();
        // a.push('a');
        // a.push('1');
        // console.log(a)

        // let a = backValue<string>(11);
        // console.log(a)
        // setTimeout(() => {
        //     console.log('调用setState');
        //     this.setState({
        //         index: this.state.index + 1
        //     })
        //     console.log('state', this.state.index);
        //     console.log('调用setState');
        //     this.setState({
        //         index: this.state.index + 1
        //     })
        //     console.log('state', this.state.index);
        // }, 0);
        // this.setState({ index: this.state.index + 1 }, () => {
        //     console.log(this.state.index);
        // })
        // this.setState({ index: this.state.index + 1 }, () => {
        //     console.log(this.state.index);
        // })
        // this.setState((preState) => ({ index: preState.index + 1 }), () => {
        //     console.log(this.state.index);
        // })
        // this.setState(preState => ({ index: preState.index + 1 }), () => {
        //     console.log(this.state.index);
        // })


        // this.setState({
        //     index: this.state.index + 1
        // })
        // console.log('state', this.state.index);
        // console.log('调用setState');
        // this.setState({
        //     index: this.state.index + 1
        // })
        // console.log('state', this.state.index);


    }

    identity: GenericIdentityFn<string> = (arg) => {
        return arg
    }
    _getName: getName = (id) => {
        return "1"
    }


    add = () => {
        // setTimeout(() => {
        //     this.setState({
        //         index: 2
        //     })
        //     console.log(111, this.state.index)

        //     this.setState({
        //         index: 3
        //     })
        //     console.log(1112, this.state.index)
        // }, 0);
        // this.setState({
        //     index: 2
        // })
        // console.log(111, this.state.index)

        // this.setState({
        //     index: 3
        // })
        // console.log(1112, this.state.index)
    }


    render() {
        console.log(1113, this.state.index)
        return (
            <div>
                {/* <button onClick={() => {
                    this.add()
                }}>加一</button> */}
                <Thook />
            </div>
        )
    }
}