// https://www.pianshen.com/article/7106254596/ 理解遍历



// interface treeNodeProps {
//     data: any //节点内容
//     key: number //key值
//     isVisted?: boolean //是否访问过
//     leftChild: treeNodeProps //左孩子
//     rightChild: treeNodeProps
// }

export class TreeNode {
    data: any //节点内容
    key: number //key值
    isVisted: boolean //是否访问过
    leftChild: TreeNode //左孩子
    rightChild: TreeNode
    constructor(key: number, data: any) {
        this.key = key;
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}


export class Tree {
    root: TreeNode;
    constructor(key: number, data: any) {
        this.root = new TreeNode(key, data)
    }

    private _size(subTree: TreeNode): number {
        if (subTree == null) {
            return 0;
        } else {
            return 1 + this._size(subTree.leftChild) + this._size(subTree.rightChild);
        }
    }
    public size(): number {
        //@ts-ignore
        return this._size(this.root);
    }
    public show() {
        console.log(this)
    }

    private _insert(node: TreeNode, newNode: TreeNode) {
        if (node.leftChild == null) {
            node.leftChild = newNode;
        } else if (node.rightChild == null) {
            node.rightChild = newNode;
        } else if (node.leftChild.leftChild === null || node.leftChild.rightChild === null) {
            this._insert(node.leftChild, newNode)
        } else if (node.rightChild.leftChild === null || node.rightChild.rightChild === null) {
            this._insert(node.rightChild, newNode)
        } else {
            this._insert(node.leftChild, newNode)
        }
    }
    public insert(key: number, data: any) {
        let newNode = new TreeNode(key, data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insert(this.root, newNode)
        }
    }

    private _preSearch(node: TreeNode) {
        let str = '';
        if (node !== null) {
            str = str + node.key;
            str = str + this._preSearch(node.leftChild);
            str = str + this._preSearch(node.rightChild);
        } else {
            str += ''
        }
        return str
    }

    public preSearch() {
        let str = this._preSearch(this.root)
    }



}


function getSubList(list: Array<TreeNode>, rootKey: number) {
    let rootIndex: number = 0;
    //@ts-ignore
    for (const [key, value] of list) {
        if (value.key == rootKey) {
            rootIndex = key;
            break;
        }
    }
    return {
        leftSubList: list.slice(0, rootIndex - 1),
        rightSubList: list.slice(rootIndex + 1)
    }
}

function rebuildPreAndMid(preList: Array<TreeNode>, midList: Array<TreeNode>): TreeNode {

    if (preList === null || midList === null || preList.length === 0 || midList.length === 0) {
        return null
    }
    let rootNode = new TreeNode(preList[0].key, preList[0].data);
    let midSubListJson = getSubList(midList, rootNode.key);
    let preSubListJson = {
        leftSubList: preList.slice(1, midSubListJson.leftSubList.length),
        rightSubList: preList.slice(midSubListJson.leftSubList.length)
    };
    rootNode.leftChild = rebuildPreAndMid(preSubListJson.leftSubList, midSubListJson.leftSubList);
    rootNode.rightChild = rebuildPreAndMid(preSubListJson.rightSubList, midSubListJson.rightSubList);
    return rootNode;
}


// 操作给定的二叉树，将其变换为源二叉树的镜像。
//  源二叉树 
// 8
// /  \
// 6   10
// / \  / \
// 5  7 9 11
// 镜像二叉树
//  8
// /  \
// 10   6
// / \  / \
// 11 9 7  5


export function Mirror(sourceTree: TreeNode, targetTree: TreeNode) {
    if (sourceTree === null) {
        return null
    }
    targetTree = new TreeNode(sourceTree.key, sourceTree.data);
    targetTree.leftChild = Mirror(sourceTree.rightChild, targetTree);
    targetTree.rightChild = Mirror(sourceTree.leftChild, targetTree);
    return targetTree
}

export function getMirrorTree(tree: any) {
    let mirrorTree = null;
    return Mirror(tree.root, mirrorTree)
}