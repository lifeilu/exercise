/**
 * createNumber
 * 根据用户输入创造出新的节点
 */
 function createNumber(num){
 	// 创建新的节点
 	var numDiv = document.createElement("div");
 	var numText = document.createTextNode( num );
 	numDiv.appendChild( numText );
 	numDiv.setAttribute( "class", "element" );
 	numDiv.style.height = num + "px";
 	// 为节点增加点击删除的效果
 	numDiv.onclick = function(){
 		this.remove();
 	};

 	return numDiv;
 }

 /**
  * addNumber
  * 显示加入的新节点
  */
 function addNumber(){
 
 	var display = document.getElementById("display");
 	var inputNode = document.getElementsByTagName("input")[0];
 	var num = inputNode.value;
 	// 点击后输入框清空并重获焦点
 	inputNode.value = "";
 	inputNode.focus();
 	// 检查用户输入数字合法性
 	if(Number(num) < 10 || Number(num) > 100){
 		alert("请输入符合要求的数字");
 		return false;
 	}
 	else if(display.children.length >= 60){
 		alert("队列数已超过60");
 		return false;
 	}
 	// 创建新节点
 	var numDiv = createNumber(num);
 	var addType = this.id;
 	// 从左侧加入
 	if( addType == "left-in" ){
 		if( display.firstChild ){
 			display.insertBefore( numDiv, display.firstChild );
 		}
 		else{
 			display.appendChild(numDiv);
 		}
 	} 
 	// 从右侧加入
 	else if ( addType == "right-in" ){
 		display.appendChild(numDiv);
 	}

 	return true;

 }

/**
 * removeNumber
 * 删除节点
 */
function removeNumber(){
 	var addType = this.id;
 	var removeNode = {};
 	var display = document.getElementById("display");

 	// 判断删除类型
 	if( addType == "left-out" ){
 		removeNode = display.firstChild;
 	} 
 	else if ( addType == "right-out" ){
 		removeNode = display.lastChild;
 	}

 	// 删除节点
 	if( removeNode ){
 		alert(removeNode.firstChild.nodeValue);
 		removeNode.remove();
 	}
 	else{
 		alert("当前列表没有内容");
 	}
}

/**
 * getNumbers
 * 获取当前数组
 */
function getNumbers(){
	var nodes = document.getElementById("display").children;
	var numList = [];

	for(var i = 0; i < nodes.length; i++){
		var number = Number(nodes[i].innerText);
		if( number )	numList.push(number);
	}

	return numList;
}

/**
 * bubbleSort
 * 冒泡排序
 */
function bubbleSort( numbers ){
	var outer = 0;
	var inner = 0;

	if( !numbers ) return [];
	for(outer = 1; outer < numbers.length; outer++){
		for(inner = 0; inner < numbers.length - outer; inner++){
			if( numbers[inner] > numbers[inner + 1]){
				[ numbers[inner], numbers[inner + 1] ] = [ numbers[inner + 1], numbers[inner] ];
				displayNodes(numbers);
			}
		}
	}
	
	return numbers;
}

/**
 * displayNodes
 * 根据数组创建节点并显示
 */
function displayNodes( numbers ){
	var display = document.getElementById("display");
	var len = display.childNodes.length;

	for(var i = 0; i < len; i++){
		display.firstChild.remove();
	}

	for(var i = 0; i < numbers.length; i++){
		display.appendChild( createNumber(numbers[i]) );
	}
}

function init() {
	// 给button绑定对象
	document.getElementById("left-in").onclick = addNumber;
	document.getElementById("right-in").onclick = addNumber;
	document.getElementById("left-out").onclick = removeNumber;
	document.getElementById("right-out").onclick = removeNumber;
	document.getElementById("sortBtn").onclick = function(){
		bubbleSort( getNumbers() );
	}
}

window.onload = function(){
  	init();
}