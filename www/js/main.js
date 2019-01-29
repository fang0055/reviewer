document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector(".list").addEventListener("click", showDetail);
    document.querySelector(".backBtn").addEventListener("click", goBack);
    document.querySelector(".addBtn").addEventListener("click", addNew);
    document.querySelector(".cancelBtn").addEventListener("click", goBack);
}

let appDataKey = [];

function showDetail(){
    document.querySelector(".homePage").classList.remove("show");
    document.querySelector(".detailsPage").classList.add("show");
    document.querySelector("#locationName").textContent = "Details";
    document.querySelector(".backBtn").classList.add("show");
}

function goBack(){
    document.querySelector(".detailsPage").classList.remove("show");
    document.querySelector(".addPage").classList.remove("show");
    document.querySelector(".backBtn").classList.remove("show");
    document.querySelector(".homePage").classList.add("show");
    document.querySelector("#locationName").textContent = "Home";
}

function addNew(){
    document.querySelector(".homePage").classList.remove("show");
    document.querySelector(".detailsPage").classList.remove("show");
    document.querySelector(".addPage").classList.add("show");
    document.querySelector("#locationName").textContent = "Add New Item";
    document.querySelector(".backBtn").classList.remove("show");
}