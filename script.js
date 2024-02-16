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
       //https://www.geeksforgeeks.org/swap-given-nodes-in-a-doubly-linked-list-without-modifying-data/

       //HANDLES HEAD AND TAILS
        if(nodeA == this.head)
            this.head = nodeB
        else if(nodeB == this.head)
            this.head = nodeA
        if(nodeA == this.tail)
            this.tail = nodeB
        else if(nodeB == this.tail)
            this.tail = nodeA

    
        let temp = null
        temp = nodeA.next //t er den efter a
        nodeA.next = nodeB.next // a peger på den efter b
        nodeB.next = temp // b peger på t
    
        if(nodeA.next != null)//tjekker A ikke er i enden og hvis ikke får den efter a til at pege tilbage på a
            nodeA.next.prev = nodeA
        if(nodeB.next != null)//samme som ovenover men med b
            nodeB.next.prev = nodeB
    
        temp = nodeA.prev 
        nodeA.prev = nodeB.prev
        nodeB.prev = temp
    
        if(nodeA.prev != null)
            nodeA.prev.next = nodeA
        if(nodeB.prev != null)
            nodeB.prev.next = nodeB
        
    }

    nodeAt(index){
        let cnt = 0;
        let temp = this.head;
        while(temp !== null){
            if(cnt === index){
                return temp;
            }
            cnt++;
            temp = temp.next;
        }
    }

    removeNodeAt(index){
        this.removeNode(nodeAt(index));
    }

    
    indexOf(data){
        let temp = this.head;
        let cnt = 0;
        while(temp!== null){
            if(temp.data == data){
                return cnt;
            }
            cnt++;
            temp = temp.next;
        }
    }

    insertAfterIndex(data,index){
        const newNode = {
            next: null,
            prev: null,
            data: data
        }
        this.insertAfterNode(newNode,this.nodeAt(index))
    }
    insertBeforeIndex(data,index){
        const newNode = {
            next: null,
            prev: null,
            data: data
        }
        this.insertBeforeNode(newNode,this.nodeAt(index))
    }
}

const ll = new LinkedList();
console.log(ll);


 /*

    IRRELEVANT KODE EFTER BEDRE LØSNING FUNDET :( ;(
        
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
        let nextMiddle = middle.next;
    
        middle.next = head.next;
        head.next.prev = middle;
        head.next = nextMiddle;
        nextMiddle.prev = head;
        
        head.prev = middle.prev;
        middle.prev.next = head;
        middle.prev = null;

        this.head = middle;
    }
    */
