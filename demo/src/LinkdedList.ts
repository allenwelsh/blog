export class LinkedListNode {
    data: any //节点内容
    key: number //key值
    nextNode: LinkedListNode //左孩子
    constructor(key: number, data: any) {
        this.key = key;
        this.data = data;
        this.nextNode = null;
    }
}




export class LinkedList {
    head: LinkedListNode;
    constructor(key: number, data: any) {
        this.head = new LinkedListNode(key, data)
    }

    public print() {
        // let list: LinkedListNode[] = [];
        let list: Array<any> = [];
        let currentHead: LinkedListNode = this.head;
        while (currentHead) {
            list.push(currentHead.key);
            currentHead = currentHead.nextNode;
        }
        console.log(list)
    }

    public reverse() {
        let prv = this.head;//当前为首节点
        let curv = this.head.nextNode;//遍历第一个节点为head的下一个节点
        let temp = this.head.nextNode.nextNode;//保存curv以后的节点继续遍历
        while (curv) {
            temp = curv.nextNode;
            curv.nextNode = prv;//当前
            prv = curv;//当前节点变为当前循环节点
            curv = temp;//保存curv以后的节点继续遍历
        }
        this.head.nextNode = null
        return prv;
    }
    //非递归
    public insert(key: number, data: any) {

        let curv = this.head;
        while (curv && curv.nextNode) {
            curv = curv.nextNode;
        }
        curv.nextNode = new LinkedListNode(key, data);
        //递归
    }
}