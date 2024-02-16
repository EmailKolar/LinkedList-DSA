"use strict"

const node1 = {
    prev: null,
    next: null,
    data: "1"
}
const node2 = {
    prev: null,
    next: null,
    data: "2"
}
const node3 = {
    prev: null,
    next: null,
    data: "3"
}

const node4 = {
    prev: null,
    next: null,
    data: "4"
}
const testNode = {
    prev: null,
    next: null,
    data: "ABE"
}

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;
node4.prev = node3;
node3.next = node4;


class LinkedList {
	constructor() {
		// test-code: change later
		this.head = node1;
        this.tail = node4;
	}

    dumpList() {
        let a_node = this.head;
        while(a_node != null ){
            console.log(`
            node: ${a_node.data}
            ---------
                 prev: ${a_node.prev?.data}
                 next: ${a_node.next?.data}
                 `);
                 a_node = a_node.next;
        }
    }

    addLast(data){//null tail?
        const nodeToAdd = {//NEW NODE
            prev: null,
            next: null,
            data: data
        }
        if(this.head === null){//IF THE LIST IS EMPTY
            this.head = nodeToAdd;
            this.tail = nodeToAdd;
        } else {
            nodeToAdd.prev = this.tail;//SET PREV TO TAIL OF LIST
            this.tail.next = nodeToAdd;//SET TAILS NEXT TO NEW NODE
            this.tail = nodeToAdd;//UPDTATE TAIL TO NEW NODE
        }
    }

    addFirst(data){
        const nodeToAdd = {//NEW NODE
            prev: null,
            next: null,
            data: data
        }
        if(this.head === null){//IF THE LIST IS EMPTY
            this.head = nodeToAdd;
            this.tail = nodeToAdd;
        } else {
            nodeToAdd.next = this.head; //SET NEXT TO HEAD
            this.head.prev = nodeToAdd; //SET HEADS PREV TO NEW NODE
            this.head = nodeToAdd; // UPDATE HEAD TO NEW NODE
        }
    }

    removeLast(){
        if (this.head === null) {//IF THE LIST IS EMPTY
            //do nothing
        } else if (this.head.next === null) {//IF THE LIST IS ONE NODE
            this.head = null;
        } else {
            this.tail = this.tail.prev; //SET TAIL TO PENULTIMATE NODE
            this.tail.next = null; // SET NEW TAILS NEXT TO NULL
        }
    }

    removeFirst(){
        if (this.head === null) {//IF THE LIST IS EMPTY
            //do nothing
        } else if (this.head.next === null) {//IF THE LIST IS ONE NODE
            this.head = null;
        } else {
            this.head = this.head.next;// SET HEAD TO SECOND NODE
            this.head.prev = null; //SET PREV OF NEW HEAD TO NULL
        }
    }

    removeNode(node){
        if (this.head === null) {//IF THE LIST IS EMPTY
            //do nothing
        } else if(this.head.next === null && node === this.head){ //IF LISTSIZE = 1
            this.head = null;
        } else if(node === this.head){ //IF HEAD
            this.head = node.next;
            this.head.prev = null;
        } else if(node === this.tail){ //IF TAIL
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else{
            node.prev.next = node.next;
            node.next.prev = node.prev; 
        }
    }

    insertBeforeNode(newNode, beforeThis){
        if(beforeThis === this.head){//IF beforeThis NODE IS  HEAD
            beforeThis.prev = newNode;
            newNode.next = beforeThis;
            this.head = newNode;
        }else{
            beforeThis.prev.next = newNode;
            newNode.prev = beforeThis.prev;

            newNode.next = beforeThis;
            beforeThis.prev = newNode;
        } 
    }
    insertAfterNode(newNode, afterThis){
        if(afterThis === this.tail){ //IF afterThis NODE IS TAIL
            afterThis.next = newNode;
            newNode.prev = afterThis;
            this.tail = newNode;
        }else{
            newNode.next = afterThis.next;
            afterThis.next.prev = newNode;
            afterThis.next = newNode;
            newNode.prev = afterThis;
        }
    }


    swapNodes(nodeA,nodeB){

        if(nodeA === this.head && nodeB === this.tail){
             this.swapHeadAndTail(nodeA,nodeB)
        } else if(nodeB === this.head && nodeA === this.tail){
            this.swapHeadAndTail(nodeB,nodeA)
        }else if(nodeA === this.head){
            this.swapHeadAndMiddle(nodeA,nodeB)
        }else if(nodeB === this.head){
            this.swapHeadAndMiddle(nodeB,nodeA)
        }
        //begge mid
        //2 lang

    }

    swapHeadAndTail(head, tail){
        tail.prev.next = head;//CHANGE NODE BEFORE B TO POINT NEXT AT A
        head.prev = tail.prev;//SET A'S PREV TO B'S PREV
        tail.next =  head.next; // CHANGE B NEXT TO A's OG NEXT
        head.next.prev = tail; //CHANGE PREV OF NODE OGRIGINALLY AFTER A TO POINT TO B
        head.next = null;//SET ENDS TO NULL
        tail.prev = null;
        this.head = tail;//UPDATE HEADS AND TAILS
        this.tail = head;   
    }
    swapHeadAndMiddle(head,middle){
        middle.prev.next = head;
        head.prev = middle.prev;
        head.next.prev = middle;
        middle.prev = head.next;
        middle.next = head.next;
        head.next = middle;
        this.head = middle;
    }
    swapTailAndMiddle(tail,middle){
    
        
    }








}

const ll = new LinkedList();
console.log(ll);


/*
nodeB.prev.next = nodeA;//CHANGE NODE BEFORE B TO POINT NEXT AT A
            nodeA.prev = nodeB.prev;//SET A'S PREV TO B'S PREV
            nodeB.next =  nodeA.next; // CHANGE B NEXT TO A's OG NEXT
            nodeA.next.prev = nodeB; //CHANGE PREV OF NODE OGRIGINALLY AFTER A TO POINT TO B
            nodeA.next = null;//SET ENDS TO NULL
            nodeB.prev = null;
            this.head = nodeB;//UPDATE HEADS AND TAILS
            this.tail = nodeA;   


            head and midlle:
            nodeA.prev = nodeB.prev;
            nodeB.prev = nodeA.next;
            nodeA.next = nodeB.next;
            nodeB.next = nodeB.prev;
            nodeB.prev = null;
            nodeA.next.prev = nodeA;
            nodeA.prev.next = nodeA
            nodeB.next.prev = nodeB;
            this.head = nodeB;


            */