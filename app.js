//BROAD
// make  a bunch of objects with pictures and some values like how many times it was viewed and clicked. 
// put all those objects in a list
// create a function that chooses three different random images and displays them on the screen


//SLIGHTLY MORE SPECIFIC
//Use a constructor to make all these imageObjects
//push constructed objects into an array


//TO DO FOR TODAY

//when you view an img this.views++
//
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

    //constructors render method
    this.render = function (domReference) {
        domReference.src = picture;
    }
    itemStorage.push(this)
}


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

console.log(itemStorage)



function renderList() {
    var results = document.getElementById('result-list');
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


    } else {
        alert('Thank you \n Your data will be used \n to enhance user experience!');
        renderList();
        makeChart();
        


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
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: voteData
            }]
        },

        // Configuration options go here
        options: {}
    });
}
