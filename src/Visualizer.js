import React from 'react';
import './Visualizer.css';
import ButtonBases from './ChooseAlgorithm.js';
import {mergeSortAnimations,getQuickSortAnimations} from './Algorithms.js';

const ANIMATIONS_SPEED = 1;
let NUMBER_OF_ARRAY_BARS = 240;

export default class Visualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array:[],
        };
    }    
    componentDidMount(){
        this.resetArray(NUMBER_OF_ARRAY_BARS);
    }
    resetArray(NUMBER_OF_ARRAY_BARS){
        const array = [];
        for(let i = 0;i < NUMBER_OF_ARRAY_BARS;i++)
            array.push(randomIntFromIntervals(5,530));
        this.setState({array});
    }
    bubbleSort(){
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0;i < array.length;i++){
            const barOneIdx = i;
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = 'rgb(255, 174, 244)';
            for(let j=i;j<array.length;j++){
                const barTwoIdx = j;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barTwoStyle.backgroundColor = 'rgb(248, 71, 224)';
                    if(array[i] > array[j]){
                        setTimeout(() => {
                            const temp = barOneStyle.height;
                            barOneStyle.height = barTwoStyle.height;
                            barTwoStyle.height = temp;
                        },ANIMATIONS_SPEED * 9);
                        
                        setTimeout(() => {
                            barOneStyle.backgroundColor = 'rgb(248, 71, 224)';
                            barTwoStyle.backgroundColor = 'rgb(255, 174, 244)';
                        },ANIMATIONS_SPEED*9);
                        const valTemp = array[i];
                        array[i] = array[j];
                        array[j] = valTemp;
                    }
                },ANIMATIONS_SPEED*9);
            }
        }
    }
    mergeSort(){
        const animations = mergeSortAnimations(this.state.array);
        for(let i = 0;i < animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIdx , barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%3 === 0 ? 'blue' : 'rgb(192, 209, 255)';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATIONS_SPEED);
            }else{
                setTimeout(() =>{
                    const [barOneIdx , newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATIONS_SPEED);
                
            }
        }
    }
    buildMaxHeap(array,arrayBars){
        for(let i = 0;i < array.length;i++){
            if(array[i] > array[(i - 1) / 2]){
                let j = i;
                while(array[j] > array[(j - 1) / 2]){
                    const barOneIdx = j;
                    const barTwoIdx = (j-1) / 2;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'black';
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                    const valtemp = array[j];
                    array[j] = array[(j - 1) / 2];
                    array[(j - 1) / 2] = valtemp;
                    barOneStyle.backgroundColor = 'black';
                    barTwoStyle.backgroundColor = 'red';
                    j = (j - 1) / 2;
                }
            }
        }
        return array;
    }
    heapSort(){
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        const array1 = this.buildMaxHeap(array,arrayBars);
        for(let i = array1.length-1;i > 0;i--){
            const barOneIdx = 0;
            const barTwoIdx = i;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = 'rgb(255, 241, 45)';
                barTwoStyle.backgroundColor = 'rgb(250, 244, 154)';
            }, i * ANIMATIONS_SPEED);
            // Swap heights .. ..
            const temp = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = temp;
            //Swap values .. ..
            const valtemp = array1[i];
            array1[i] = array1[0];
            array1[0] = valtemp;
            //swap Colors
            setTimeout(() => {
                barOneStyle.backgroundColor = 'rgb(250, 244, 154)';
                barTwoStyle.backgroundColor = 'rgb(255, 241, 45)';
            },i * ANIMATIONS_SPEED);            
            let j = 0,index = 0;
            do{
                index = (2 * j+1);
                if(array1[index] < array1[index + 1] && index < (i - 1))
                    index++;
                if(array1[j] < array1[index] && index < i){
                    const barOneIdx = j;
                    const barTwoIdx = index;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'rgb(255, 241, 45)';
                        barTwoStyle.backgroundColor = 'rgb(250, 244, 154)';
                    },j * ANIMATIONS_SPEED);                    
                    // Swap heights .. ..
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                    //Swap values .. ..
                    const valtemp = array1[j];
                    array1[j] = array1[index];
                    array1[index] = valtemp;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'rgb(250, 244, 154)';
                        barTwoStyle.backgroundColor = 'rgb(255, 241, 45)';
                    }, j * ANIMATIONS_SPEED);                    
                    j = index;           
                }
            }while(index < i);
        }
    }
    
    quickSort(){
        this.resetArray();
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        this.quickSortAlgo(0,array.length-1,array,arrayBars);
    }
    quickSortAlgo(
        low,
        high,
        array,
        arrayBars
    ){        
        let i,j,pivot;
        if(low < high){
            i = low;
            j = high;
            pivot = low;
            while(i <= j){
                while(array[j] > array[pivot] && i <= high)
                    i+=1;
                while(array[j] > array[pivot] && j >= 0)
                    j-=1;
                if(i < j){
                    //swap array[i],array[j];
                    const barOneIdx = i;
                    const barTwoIdx = j;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = 'black';
                    barTwoStyle.backgroundColor = 'red';
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'black';
                }
            }
            //swap array[pivot],array[j]
            const barOneIdx = pivot;
            const barTwoIdx = j;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.backgroundColor = 'black';
            barTwoStyle.backgroundColor = 'red';
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
            let temp = array[pivot];
            array[pivot] = array[j];
            array[j] = temp;
            barOneStyle.backgroundColor = 'red';
            barTwoStyle.backgroundColor = 'black';
            console.log("First");
            this.quickSortAlgo(low,j-1,array,arrayBars);
            console.log("first");
            this.quickSortAlgo(j+1,high,array,arrayBars);
            console.log("Second");
        }

    }
    insertionSort(){
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 1;i < array.length;i++){
            let key = array[i],
            j = i - 1;
            const keyBarStyle = arrayBars[i].style;
            let keyHeight = keyBarStyle.height;
            keyBarStyle.backgroundColor = 'rgb(243, 23, 23)';
            while(j >= 0 && array[j] > key){
                const barOneIdx = j+1;
                const barTwoIdx = j;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'rgb(255, 252, 47)';
                    barTwoStyle.backgroundColor = 'rgb(243, 23, 23)';
                    barOneStyle.height = barTwoStyle.height;
                },1000);
                array[j+1] = array[j];
                setTimeout(() =>{
                    barOneStyle.backgroundColor = 'rgb(243, 23, 23)';
                    barTwoStyle.backgroundColor = 'rgb(255, 252, 47)';
                },1000);                
                j = j-1;
            }
            const barIdx = j+1;
            const barStyle = arrayBars[barIdx].style;
            setTimeout(() => {
                barStyle.backgroundColor = 'rgb(255, 252, 47)';
                barStyle.height = keyHeight;
            },1000);   
            keyBarStyle.backgroundColor = 'rgb(243, 23, 23)';
            barStyle.backgroundColor = 'rgb(255, 252, 47)';         
            array[j+1] = key;
        }
        console.log(array);
    }
    selectionSort(){
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0;i < array.length-1;i++){
            let min = array[i],index=0;
            for(let j = i+1;j < array.length;j++){
                if(array[j] < min){
                    min = array[j];
                    index = j;
                }
            }
            if(array[i] > min){
                const barOneIdx = i;
                const barTwoIdx = index;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = 'black';
                barTwoStyle.backgroundColor = 'red';
                setTimeout(() => {
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                },i*ANIMATIONS_SPEED*9);
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'rgb(192, 209, 255)';
                    barTwoStyle.backgroundColor = 'rgb(192, 209, 255)';
                },i * ANIMATIONS_SPEED*9);
                let valtemp = array[i];
                array[i] = array[index];
                array[index] = valtemp;
            }
        }
        console.log(array);
    }
    shellSort(){
        NUMBER_OF_ARRAY_BARS = 20;
        this.resetArray(NUMBER_OF_ARRAY_BARS);
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        let n = array.length;
        for(let gap = (n/2);gap > 0;gap = (gap/2)){
            for(let i = gap;i < n;i++){
                let temp = array[i];
                let j;
                for(let j = i; (j>= gap) && (array[j-gap] > temp); j=(j-gap))
                    array[j] = array[j-gap];
                array[j] = temp;
            }
        }
        console.log(array);
    }
       testSortingAlgorithms(){
        for(let i = 0;i<100;i++){
            const array  = [];
            const length = randomIntFromIntervals(1,1000);
            for(let i = 0;i<length;i++){
                array.push(randomIntFromIntervals(-1000,1000));
            }
            const javaScriptSortedArray = array.slice().sort((a,b) => a-b);
            const SortedArray = mergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray , SortedArray));
        }
    }
    render(){
        const { array } = this.state;
        return (
            <div className = "array-container">
                <button className = "chooseButton" onClick = {()=>this.resetArray(NUMBER_OF_ARRAY_BARS)}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlecGRixi7dZTUXYczbVOYkClH0mEs9TL7jg&usqp=CAU'
                        title = 'Generate New Array'
                        width ='40%'
                    />
                </button>
                {/* <button className = "chooseButton" onClick = {()=>this.quickSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbiq1gy11a3gmsU-SZR4QEXRQEIdrTEmhpw&usqp=CAU'
                        title = 'Quick Sort'
                        width ='40%'
                    />
                </button> */}
                <button className = "chooseButton" onClick = {()=>this.mergeSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKgHagZSiP-ygnOSHeSdDdoEjEMpupChsG_Q&usqp=CAU'
                        title = 'Merge Sort'
                        width ='40%'
                    />
                </button>
                <button className = "chooseButton" onClick = {()=>this.bubbleSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxaCRALShSTiuQw8-EZuMeqIQNVPOjTI-Zg&usqp=CAU'
                        title = 'Bubble Sort'
                        width ='40%'
                    />
                </button>
                <button className = "chooseButton" onClick = {()=>this.insertionSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxaCRALShSTiuQw8-EZuMeqIQNVPOjTI-Zg&usqp=CAU'
                        title = 'Insertion Sort'
                        width ='40%'
                    />
                </button>
                <button className = "chooseButton" onClick = {()=>this.selectionSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxaCRALShSTiuQw8-EZuMeqIQNVPOjTI-Zg&usqp=CAU'
                        title = 'Selection Sort'
                        width ='40%'
                    />
                </button>
                <button className = "chooseButton" onClick = {()=>this.shellSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxaCRALShSTiuQw8-EZuMeqIQNVPOjTI-Zg&usqp=CAU'
                        title = 'Shell Sort'
                        width ='40%'
                    />
                </button>
                {/* <button className = "chooseButton" onClick = {()=>this.heapSort()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhn-prsLXZH8QNsW7tYRqeQnOqFsMQ6qOPQ&usqp=CAU'
                        title = 'Heap Sort'
                        width ='40%'
                    />
                </button> */}
                <button className = "chooseButton" onClick = {()=>this.testSortingAlgorithms()}>
                    <ButtonBases 
                        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhn-prsLXZH8QNsW7tYRqeQnOqFsMQ6qOPQ&usqp=CAU'
                        title = 'Test The Algorithms ...'
                        width ='40%'
                    />
                </button>
                <br></br>
                {array.map((value,idx) => (
                    <div className = 'array-bar' key = {idx} style = {{height:`${value}px`}}>
                    </div>
                ))}
                {/* {chooseAButton()} */}
                
            </div> 
        );
    }
}
function randomIntFromIntervals(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function arraysAreEqual(arrayOne,arrayTwo){
    if(arrayOne.length !== arrayTwo.length){  
      return false;
    }
    for(let i = 0;i < arrayOne.length;i++)
      if(arrayOne[i] !== arrayTwo[i]){
        return false;
    }
    return true;
}