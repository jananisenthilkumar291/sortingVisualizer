export function mergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1)
        return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array , 0,array.length-1 , auxiliaryArray , animations);
    return animations;
}
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
        if(startIdx === endIdx)
            return;
        const middleIdx = Math.floor((startIdx+endIdx)/2);
        mergeSortHelper(auxiliaryArray,startIdx,middleIdx,mainArray,animations);
        mergeSortHelper(auxiliaryArray,middleIdx+1,endIdx,mainArray,animations);
       doMerge(mainArray,startIdx,middleIdx,endIdx,auxiliaryArray,animations);
}
function doMerge(
    mainArray ,
    startIdx ,
    middleIdx,
    endIdx ,
    auxiliaryArray,
    animations){
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;
        while(i <= middleIdx && j <= endIdx){
            animations.push([i,j]);
            animations.push([i,j]);
            if(auxiliaryArray[i] <= auxiliaryArray[j]){
                animations.push([k , auxiliaryArray[i]]);
                mainArray[k++] = auxiliaryArray[i++];
            }else{
                animations.push([k , auxiliaryArray[j]]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
        while(i <= middleIdx){
            animations.push([i,i]);
            animations.push([i,i]);
            animations.push([k , auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        while(j <= endIdx){
            animations.push([j,j]);
            animations.push([j,j]);
            animations.push([k , auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
}
export function getQuickSortAnimations(array){
    const animations = [];
    if(array.length <= 1)
        return array;
    QuickSort(array , 0 , array.length - 1,animations);
    return animations;
}
function QuickSort(
    array,
    low,
    high,
    animations
){
    if(low < high){
        let p = partition(array , low, high,animations);
        QuickSort(array , low , p - 1,animations);
        QuickSort(array , p+1 , high,animations);
    }
}
function partition(
    array,
    low,
    high,
    animations
){
    let x = array[high];
    let i = (low - 1);
    for(let j = 1;j <= high-1;j++){
        // animations.push([i ,j])
        if(array[j] <= x){
            i++;
            animations.push([i,j]);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animations.push([i+1,high]);
    let temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;
    return (i+1);
}
