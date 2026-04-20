// function curry (fn, arg){
//   let len = fn.length
//   let params = arg || []
//   return function (...args){
//     let newArgs = params.concat(args)
//     if(newArgs.length >= len){
//       return fn.apply(this, newArgs)
//     }else{
//       return curry.call(this, fn, newArgs)
//     }
//   }
// }
//
// function sum(a,b,c){
//   console.log(a + b + c)
//   return a + b+ c
// }
//
// let newSum = curry(sum)
// newSum(1)(2,4)

// /**
//  * 缓存淘汰策略
//  * 淘汰最久未使用的数据
//  * 每次读取时，将数据置于顶部
//  * 每次插入时，将数据置于顶部，同时如果超出最大size,则移除最久未使用的
//  */
// class LRUCache{
//   constructor(maxSize){
//     this.maxSize = maxSize
//     this.cacheMap = new Map()
//   }
//
//   get(key){
//     if(!this.cacheMap.has(key)) return -1
//     let value = this.cacheMap.get(key)
//     // 先移除，再插入
//     this.cacheMap.delete(key)
//     this.cacheMap.set(key, value)
//     return value
//   }
//
//   set(key, value){
//     if(this.cacheMap.has(key)){
//       this.cacheMap.delete(key)
//     }
//     if(this.cacheMap.size >= this.maxSize){
//       let oldKey = this.cacheMap.keys().next().value
//       this.cacheMap.delete(oldKey)
//     }
//     this.cacheMap.set(key, value)
//   }
// }
//

// /**
//  * 链表
//  */
// class LinkNode {
//   constructor(key, value){
//     this.key = key;
//     this.value = value;
//     this.pre = null;
//     this.next = null;
//   }
// }
//
// class LRUCache{
//   constructor(maxSize){
//     this.maxSize = maxSize;
//     this.cacheMap = new Map();
//     this.head = new LinkNode();
//     this.tail = new LinkNode();
//
//     this.head.next = this.tail
//     this.tail.pre = this.head;
//   }
//
//   _moveToHead(node){
//     this._removeNode(node)
//     this._addNodeToHead(node)
//   }
//
//   _removeNode(node){
//     node.pre.next = node.next
//     node.next.pre = node.pre
//   }
//
//   _addNodeToHead(node){
//     node.next = this.head.next
//     node.pre = this.head
//
//     this.head.next.pre = node
//     this.head.next = node;
//   }
//
//   get(key){
//     if(!this.cacheMap.has(key)) return -1
//     let node = this.cacheMap.get(key)
//     this._moveToHead(node)
//     return node.value
//   }
//
//   set(key, value){
//     // 更新
//     if(this.cacheMap.has(key)){
//       let node = this.cacheMap.get(key)
//       node.value = value
//       // 将节点放到顶部
//       this._moveToHead(node)
//     }else{
//       // 插入操作
//       if(this.cacheMap.size >= this.maxSize){
//         let lastNode = this.tail.pre
//         this._removeNode(lastNode)
//         this.cacheMap.delete(lastNode.key)
//       }
//       // 创建新节点
//       let newNode = new LinkNode(key, value)
//       this.cacheMap.set(key, newNode)
//       this._addNodeToHead(newNode)
//     }
//   }
// }


// let cacheNode = new LRUCache(3)
// cacheNode.set('1', '1-1')
// cacheNode.set('2', '2-1')
// cacheNode.set('3', '3-1')
// cacheNode.set('4', '4-1')
//
// console.log(cacheNode.get('1'));
// console.log(cacheNode.get('2'));

// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var twoSum = function(nums, target) {
//   for(let i=0; i<nums.length; i++){
//     for(let j = nums.length-1; j>i; j--){
//       if(nums[i] + nums[j] == target){
//         return  [i, j]
//         break;
//       }
//     }
//   }
// };

// var twoSum = function(nums, target) {
//   let obj = {}
//   for(let i=0; i<nums.length; i++){
//     let num = target - nums[i]
//     if(obj[num] != undefined){
//       return [obj[num], i]
//       break;
//     }
//     obj[nums[i]] = i
//   }
// };
//
// let nums = [2,7,11,15], target = 9;
// console.log(twoSum(nums, target))

// var longestConsecutive = function(nums) {
//   if(nums.length === 0) return 0
//   let len = 1
//   let maxLen = 1
//   nums.sort((a,b)=>a-b)
//   let obj = {}
//   for(let i = 0; i<nums.length; i++){
//     if(obj[nums[i]]) continue
//     if(obj[nums[i] - 1 ] != undefined){
//       ++len
//       maxLen = Math.max(len, maxLen)
//     }else{
//       len = 1
//     }
//     obj[nums[i]] = len
//   }
//   return maxLen
// };
//
// // [-1, -1, 0, 1, 3, 4, 5, 6, 7, 8, 9]
//
// longestConsecutive([9,1,4,7,3,-1,0,5,8,-1,6])
//
// /**
//  * @param {number[]} nums
//  * @return {void} Do not return anything, modify nums in-place instead.
//  */
// var moveZeroes = function(nums) {
//   for(let i = 0; i<nums.length; i++){
//     for(let j=1; j<nums.length; j++){
//       if(nums[i] == 0){
//         let n = nums[i]
//         nums[i] = nums[j]
//         nums[j] = n
//       }
//     }
//   }
//
//   console.log(nums)
// };
//
// moveZeroes([0,1,0,3,12])

// // 股票
// function aaa(prices){
//   if(prices.length === 0) return 0
//   let inp = prices[0]
//   let maxLr = 0
//
//   for(let i = 1; i < prices.length; i++){
//     if(prices[i] > inp){
//       maxLr = Math.max(maxLr, prices[i] - inp)
//     }else{
//       inp = Math.min(inp, prices[i])
//     }
//   }
//
//   return maxLr
// }
//
// // 测试用例
// const testCases = [
//   [7, 1, 5, 3, 6, 4],
//   [7, 6, 4, 3, 1],
//   [1, 2, 3, 4, 5],
//   [3, 3, 5, 0, 0, 3, 1, 4],
//   []
// ];
// // 测试用例 1: 价格数组 = [7,1,5,3,6,4], 最大利润 = 5
// // VM28075:28 测试用例 2: 价格数组 = [7,6,4,3,1], 最大利润 = 0
// // VM28075:28 测试用例 3: 价格数组 = [1,2,3,4,5], 最大利润 = 4
// // VM28075:28 测试用例 4: 价格数组 = [3,3,5,0,0,3,1,4], 最大利润 = 4
// // VM28075:28 测试用例 5: 价格数组 = [], 最大利润 = 0
// const prices = [3,3,5,0,0,3,1,4]
// console.log(aaa(prices))

// function fd(fn, time){
//   let timer = null
//
//   return function (...args){
//     if(timer) clearTimeout(timer)
//
//     setTimeout(()=>{
//       fn.apply(this, args)
//     }, time)
//   }
// }
//
// function jl(fn, time){
//   let lastTime = 0
//
//   return function (...args){
//     let curTime = new Date()
//     if(curTime - lastTime >= time){
//       fn.apply(this, args)
//       lastTime = curTime
//     }
//   }
// }


// function deepClone(obj){
//   let newObj = Array.isArray(obj) ? [] : {}
//   Object.entries(obj).forEach(([key, value])=>{
//     if(typeof value === 'object'){
//       newObj[key] = deepClone(value)
//     }else{
//       newObj[key] = value
//     }
//   })
// }
//
// function Parent (name){
//   this.name = name
// }
//
// Parent.prototype.say = function (){
//   console.log(this.name);
// }

// function Child(name){
//   this.age = 10
//   Parent.call(this, name)
// }
// Child.prototype = new Parent()
// Child.prototype.constructor  = Child

// async function async1() {
//   console.log('E');
//   await async2();
//   console.log('F');
// }
//
// async function async2() {
//   console.log('G');
// }
//
// setTimeout(() => console.log('H'), 0);
// async1();
// new Promise((res) => {
//   console.log('I');
//   res();
// }).then(() => console.log('J'))
//
//
//
// // E I G F J H
//
// function a(){
//   setTimeout(()=>{
//     console.log(2);
//   },0)
// }
// const gFnc = function *(){
//   console.log(111);
//   yield 1
//   console.log(222);
//   console.log(22222);
//   yield a()
//   yield 3
// }
//
// const gFn = gFnc()
// console.log(gFn.next().value);
// console.log(gFn.next().value);
// console.log(gFn.next().value);
//
//
// function Parent(){
//   this.name = 'nnn'
//   this.ll = 'll'
// }
//
// function Parent1(){
//   this.name = 'mmm'
//   this.age = '12'
// }
//
// let obj = new Parent()
//
// Object.setPrototypeOf(obj, Parent1.prototype)
//
// console.log(obj.name);
// console.log(obj.age, obj.ll);
// console.log(obj instanceof  Parent)
// console.log(obj instanceof  Parent1)
//
// /**
//  * 一只青蛙一次可以跳1或2级台阶，求青蛙跳上n级台阶有多少中解法
//  */
//
// function fn(n){
//   const fn = []
//   fn[1] = 1;
//   fn[2] = 2;
//   for(let i = 3; i< n; i++){
//     fn[i] = fn[i-1] + fn[i-2]
//   }
//   return fn[n]
// }
//
// /**
//  * 找出数组中第n大的数字
//  */
// function getNum(arr, n){
//   for(let i = 0; i<arr.length; i++){
//     for(let j = 1; j<arr.length; j++){
//       if(arr[i] > arr[j]){
//         let num = arr[i]
//         arr[i] = arr[j]
//         arr[j] = num
//       }
//     }
//   }
//
//   return arr[n]
// }




// for(let i = 0; i < 16; i++){
//   $('body').append("<img  src=\"imgs/xiaowu.jpg\" />")
// }
//
//
// class EventMatter{
//   constructor(){
//     this.eventList = []
//   }
//   on(name, callBack){
//     if(!this.eventList[name]){
//       this.eventList[name] = []
//     }else{
//       this.eventList[name].push(callBack)
//     }
//   }
//
//   off(name, callBack){
//     this.eventList[name] = this.eventList[name].filter(item=> item !== callBack)
//   }
//
//   emit(name, ...args){
//     this.eventList.forEach((callBack)=>{
//       callBack(...args)
//     })
//   }
// }
//
// let obj = new EventMatter()
// obj.on()
//
// function fd(callBack, time){
//   let timer = null
//   return function (...args){
//     if(timer) clearTimeout(timer)
//     timer = setTimeout(()=>{
//       callBack(...args)
//     }, time)
//    }
// }
//
// function debounce(fn, duration, leading){
//   let timer = null
//   return function (...args){
//     if(leading && !timer){
//       fn.call(this, args)
//     } else{
//       if(timer) clearTimeout(timer)
//       timer = setTimeout(()=>{
//         fn.call(this, args)
//         timer = null
//       }, duration)
//     }
//   }
// }

import { say } from "my-test-npm-package"

say();


