// let leftCoor = document.querySelector(".CSBtn").offsetLeft;
// let topCoor = document.querySelector(".CSBtn").offsetTop;

if (document.deviceready) {
    document.addEventListener("deviceready", init);
} else {
    document.addEventListener("DOMContentLoaded", init);
}

let appData = [];
let appDataKey = "appDataKey";
let imageLocation = null;
let itemObj = {};
let titleInput = null;
let rating = 0;
let itemId = null;

function init(){

    // console.log(leftCoor + " and " + topCoor);

    if (localStorage.getItem(appDataKey)){
        checkLocal();
    } else{
        document.querySelector(".remind").classList.remove("remindDisapear");
    }

    document.querySelector(".backBtn").addEventListener("click", goBack);
    document.querySelector(".addBtn").addEventListener("click", takePhoto);
    document.querySelector(".cancelBtn").addEventListener("click", goBack);
    document.querySelector(".saveBtn").addEventListener("click", saveData);
    document.querySelector(".deleteBtn").addEventListener("click", deleteItem);
}

function checkLocal(){
    appData = JSON.parse(localStorage.getItem(appDataKey));
    if (appData.length == 0){
        document.querySelector(".remind").classList.remove("remindDisapear");
    } else {
            appData.forEach(function(item){
            let documentFragment = new DocumentFragment();
            let list = document.createElement("div");
            let imageContainer = document.createElement("div");
            let image = document.createElement("img");
            let overlay = document.createElement("p");
            let listTitle = document.createElement("h2");
        
            image.src = item.image;
            image.setAttribute("alt", "Item's image");
            listTitle.textContent = item.title;
            list.setAttribute("data-id", item.id);
        
            list.className = "list";
            imageContainer.className = "imgContainer";
            overlay.className = "overlay";
        
            imageContainer.appendChild(image);
            imageContainer.appendChild(overlay);
            list.appendChild(imageContainer);
            list.appendChild(listTitle);
            documentFragment.appendChild(list);
            document.querySelector(".homePage").insertBefore(documentFragment, document.querySelector(".homePage").childNodes[0]); // insertBefore refered here: https://www.w3schools.com/jsref/met_node_insertbefore.asp
            list.addEventListener("click", showDetail);
            });
        }
}

function showDetail(ev){
    let list = document.querySelector(".details");
    let image = document.querySelector(".imgDetail");
    let itemTitle = document.querySelector(".itemTitle");
    let stars = document.querySelectorAll(".starD");
    let listId = ev.currentTarget.getAttribute("data-id");
    let i = appData.findIndex(item => item.id == listId);
    document.querySelector(".deleteBtn").setAttribute("data-index", i);

    document.querySelector(".starsContainer").setAttribute("data-rating", appData[i].rating);
    rating = appData[i].rating;
    stars.forEach(function(item){
        item.classList.remove("rated");
        item.addEventListener("click", setRatingDetail);
    });
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent("click"));

    image.src = appData[i].image;
    itemTitle.textContent = appData[i].title;
    
    showExample();
}

function showExample(){
    document.querySelector(".homePage").classList.remove("show");
    document.querySelector(".detailsPage").classList.add("show");
    document.querySelector("#locationName").textContent = "Details";
    document.querySelector(".backBtn").classList.add("show");
    document.querySelector(".addBtn").classList.remove("disapear");
}
 
function goBack(){
    document.querySelector(".detailsPage").classList.remove("show");
    document.querySelector(".addPage").classList.remove("show");
    document.querySelector(".backBtn").classList.remove("show");
    document.querySelector(".homePage").classList.add("show");
    document.querySelector(".addBtn").classList.remove("disapear");
    document.querySelector("#locationName").textContent = "Home";
}

function addNew(){
    document.querySelector(".homePage").classList.remove("show");
    document.querySelector(".detailsPage").classList.remove("show");
    document.querySelector(".addPage").classList.add("show");
    document.querySelector("#locationName").textContent = "Add New Item";
    document.querySelector(".backBtn").classList.remove("show");
    document.querySelector(".addBtn").classList.add("disapear");
    document.querySelector(".inputText").value = "";
    rating = 0;
    prepareStars();
}

function deleteItem(){
    let indexNum = document.querySelector(".deleteBtn").getAttribute("data-index");
    appData.splice(indexNum, 1);
    localStorage.setItem(appDataKey, JSON.stringify(appData));
    // indexNum++;
    let i = appData.length - indexNum;
    let homeList = document.querySelector(".homePage");
    homeList.removeChild(homeList.childNodes[i]); 
    // removeChild refered here: https://www.w3schools.com/jsref/met_node_removechild.asp
    if (appData.length == 0){
        console.log(appData.length);
        document.querySelector(".remind").classList.remove("remindDisapear");
    }
    goBack();
}

function takePhoto(){
    let opts = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK
    };

    navigator.camera.getPicture(wellDone, soBad, opts);
    
    function wellDone(imgURI){
    document.querySelector(".newPic").src = imgURI;
    imageLocation = imgURI;
    addNew();
    }

    function soBad(msg){
    alert(msg + ". Click OK to go back to home page.");
    }
}

function prepareStars(){
    let stars = document.querySelectorAll(".star");
    stars.forEach(function(star){
        star.classList.remove("rated");
        star.addEventListener("click", setRating);
    });
 
}

function setRating(ev){
    let span = ev.currentTarget;
    let stars = document.querySelectorAll(".star");
    let match = false;
    let num = 0;

    stars.forEach(function(star, index){
        if(match){
            star.classList.remove("rated");
        }else{
            star.classList.add("rated");
        }
        if(star === span){
            match = true;
            num = index + 1;
        }
    });
    document.querySelector(".stars").setAttribute("data-rating", num);
    rating = num;
}

function setRatingDetail(ev){
    let span = ev.currentTarget;
    let stars = document.querySelectorAll(".starD");
    let match = false;
    let num = 0;

    stars.forEach(function(star, index){
        if(match){
            star.classList.remove("rated");
        }else{
            star.classList.add("rated");
        }
        if(star === span){
            match = true;
            num = index + 1;
        }
    });
    document.querySelector(".starsContainer").setAttribute("data-rating", num);
    rating = num;
}

function saveData(){
    titleInput = document.querySelector(".inputText").value;
    if(titleInput && rating > 0){
        itemObj = {
            id: Date.now(),
            title: titleInput,
            rating: rating,
            image: imageLocation
        }
        itemId = itemObj.id;
        console.log(itemId);
        appData.push(itemObj);
        localStorage.setItem(appDataKey, JSON.stringify(appData));
        document.querySelector(".remind").classList.add("remindDisapear");
    
        createHomeList();
    } else if(!titleInput){
        alert("Please give the item a title to continue ;)");
    } else{
        alert("Please rate the item to continue ;)");
    }
}

function createHomeList() {
    let documentFragment = new DocumentFragment();
    let list = document.createElement("div");
    let imageContainer = document.createElement("div");
    let image = document.createElement("img");
    let overlay = document.createElement("p");
    let listTitle = document.createElement("h2");

    image.src = imageLocation;
    image.setAttribute("alt", "Item's image");
    listTitle.textContent = document.querySelector(".inputText").value;
    list.setAttribute("data-id", itemId);

    list.className = "list";
    imageContainer.className = "imgContainer";
    overlay.className = "overlay";
    list.addEventListener("click", showDetail);

    imageContainer.appendChild(image);
    imageContainer.appendChild(overlay);
    list.appendChild(imageContainer);
    list.appendChild(listTitle);
    documentFragment.appendChild(list);
    document.querySelector(".homePage").insertBefore(documentFragment, document.querySelector(".homePage").childNodes[0]); // insertBefore refered here: https://www.w3schools.com/jsref/met_node_insertbefore.asp
    
    goBack();
}