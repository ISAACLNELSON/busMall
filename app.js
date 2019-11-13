

/* TO DO FOR TODAY
use local storage
- send data to localStorage after 25 clicks
- make a load condition that asks if local storage is empty, if it is empty then load normally. 
if it has data stored load using that same data

*/
var ITEM_DATA = 'itemData';
var itemStorage = [];
var clickCount = 0;
const MAX_CLICK_COUNTER = 25;
var oldThree = [];

function getRandom() {
    return Math.floor(Math.random() * (itemStorage.length));
}

function select3ItemsAndRender() {

    var activeThree = [];
    while (activeThree.length < 3) {

        var nextRandomValue = getRandom();

        while (itemStorage[nextRandomValue] === oldThree[0] || itemStorage[nextRandomValue] === oldThree[1] || itemStorage[nextRandomValue] === oldThree[2]) {
            nextRandomValue = getRandom();
        }

        if (!activeThree.includes(itemStorage[nextRandomValue])) {
            activeThree.push(itemStorage[nextRandomValue]);
            itemStorage[nextRandomValue].views++;
        }
    }

    var imageOne = document.getElementById('first-img');
    var imageTwo = document.getElementById('second-img');
    var imageThree = document.getElementById('third-img');

    activeThree[0].render(imageOne);
    activeThree[1].render(imageTwo);
    activeThree[2].render(imageThree);



    oldThree[0] = activeThree[0];
    oldThree[1] = activeThree[1];
    oldThree[2] = activeThree[2];
    return activeThree;
}


//constructor
var Item = function (name, picture) {
    this.name = name;
    this.picture = picture;
    this.votes = 0;
    this.views = 0;

    this.markClick = function () {
        this.votes++;
    }

    this.render = function (domReference) {
        domReference.src = this.picture;
    }

    this.loadData = function (data) {
        this.name = data.name;
        this.picture = data.picture;
        this.votes = data.votes;
        this.views = data.views;
    }
}

if (localStorage.getItem(ITEM_DATA) === null) {
    //constructed items
    var bag = new Item('Bag', './images/bag.jpg');
    var banana = new Item('Banana', './images/banana.jpg');
    var bathroom = new Item('Bathroom', './images/bathroom.jpg');
    var boots = new Item('Boots', './images/boots.jpg');
    var breakfast = new Item('Breakfast', './images/breakfast.jpg');
    var bubblegum = new Item('Bubblegum', './images/bubblegum.jpg');
    var chair = new Item('Chair', './images/chair.jpg');
    var cthulhu = new Item('Cthulhu', './images/cthulhu.jpg');
    var dogDuck = new Item('Dog-Duck', './images/dog-duck.jpg');
    var dragon = new Item('Dragon', './images/dragon.jpg');
    var pen = new Item('Pen', './images/pen.jpg');
    var petSweep = new Item('Pet-Sweep', './images/pet-sweep.jpg');
    var scissors = new Item('Scissors', './images/scissors.jpg');
    var shark = new Item('Shark', './images/shark.jpg');
    var sweep = new Item('Sweep', './images/sweep.png');
    var tauntaun = new Item('Tauntaun', './images/tauntaun.jpg');
    var unicorn = new Item('Unicorn', './images/unicorn.jpg');
    var usb = new Item('USB', './images/usb.gif');
    var waterCan = new Item('Water-Can', './images/water-can.jpg');
    var wineGlass = new Item('Wine-Glass', './images/wine-glass.jpg');


    itemStorage.push(bag);
    itemStorage.push(banana);
    itemStorage.push(bathroom);
    itemStorage.push(boots);
    itemStorage.push(breakfast);
    itemStorage.push(bubblegum);
    itemStorage.push(chair);
    itemStorage.push(cthulhu);
    itemStorage.push(dogDuck);
    itemStorage.push(dragon);
    itemStorage.push(pen);
    itemStorage.push(petSweep);
    itemStorage.push(scissors);
    itemStorage.push(shark);
    itemStorage.push(sweep);
    itemStorage.push(tauntaun);
    itemStorage.push(unicorn);
    itemStorage.push(usb);
    itemStorage.push(waterCan);
    itemStorage.push(wineGlass);
} else {
    var jsonData = localStorage.getItem(ITEM_DATA);
    var data = JSON.parse(jsonData);

    for (var i = 0; i < data.length; i++) {
        var newItem = new Item('', '');

        newItem.loadData(data[i]);
        itemStorage.push(newItem);
    }
}






function renderList() {
    var results = document.getElementById('result-list');
    results.innerHTML = '';
    for (var i = 0; i < itemStorage.length; i++) {
        var currentObjName = itemStorage[i].name;
        var currentObjVotes = itemStorage[i].votes;
        var currentObjViews = itemStorage[i].views;
        var li = document.createElement('li');
        li.textContent = `Item ${i + 1}: ${currentObjName} Votes: ${currentObjVotes} Views: ${currentObjViews}`;
        results.append(li);
    }
}


function clickManager(event) {
    clickCount++;


    if (clickCount < MAX_CLICK_COUNTER) {
        var itemIndex;

        if (event.target.id === 'imageOne') {
            itemIndex = 0;
        } else if (event.target.id === 'imageTwo') {
            itemIndex = 1;
        } else {
            itemIndex = 2;
        }
        var clickedItem = select3ItemsAndRender()[itemIndex];
        clickedItem.markClick();

        select3ItemsAndRender();
    } else {
        saveItemDataToLocalStorage();
        renderList();
        makeChart();
    }

    function saveItemDataToLocalStorage(){
        var jsonData = JSON.stringify(itemStorage);
        localStorage.setItem(ITEM_DATA, jsonData);
    }



}


select3ItemsAndRender();

var imageOne = document.getElementById('first-img');
var imageTwo = document.getElementById('second-img');
var imageThree = document.getElementById('third-img');

imageOne.addEventListener('click', clickManager);
imageTwo.addEventListener('click', clickManager);
imageThree.addEventListener('click', clickManager);


function makeChart() {

    var chartLabels = [];
    var voteData = [];
    for (var i = 0; i < itemStorage.length; i++) {
        chartLabels.push(itemStorage[i].name);
        voteData.push(itemStorage[i].votes);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Product Votes',
                backgroundColor: 'rgb(202, 42, 42)',
                borderColor: 'red',
                data: voteData
            }]
        },

        // Configuration options go here
        options: {}
    });
}
