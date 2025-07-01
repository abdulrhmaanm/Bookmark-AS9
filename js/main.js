var webUrl = document.getElementById("weburl")
var bookMarkerName = document.getElementById("Bookmarkername")
var visitBtn = document.getElementById("visit")
var deleteBtn = document.getElementById("delete")
var table = document.getElementById("table")
var validationMesg = document.getElementById("validMes")

var webList = [];

if (localStorage.getItem("Websites") !==null){
    webList =JSON.parse(localStorage.getItem("Websites"));
    displayData();
}
function addWeb(){
    if(validationUrl() && validationName()){
        var webSite = {
        url: webUrl.value,
        name:bookMarkerName.value
    }
    webList.push(webSite)
    localStorage.setItem("Websites",JSON.stringify(webList));
    displayData();
    clearForm();
    validationMesg.classList.add("d-none");
    }
    else{
        validationMesg.classList.remove("d-none");
        return;
    }


}
function displayData(){
    var box =""
    for(var i = 0; i<webList.length;i++){
        box+= createData(i);
    }
    table.innerHTML=box;

}
function createData(i){
    if (!webList[i]) return "";
    return `        <tr class="table-body">
        <th id="index">${i+1}</th>
        <th id="webname">${webList[i].name}</th>
        <th onclick="visitWeb(${i})" id="visit"><button class="btn-visit">Visit</button></th>
        <th onclick="deleteWeb(${i})" id="delete"><button class="btn-delete">Delete</button></th>
    </tr>`;
}
function clearForm(){
    webUrl.value=null;
    bookMarkerName.value=null;
    webUrl.classList.remove("is-valid");
    bookMarkerName.classList.remove("is-valid");
}
function deleteWeb(i){
    webList.splice(i,1)
    localStorage.setItem("Websites",JSON.stringify(webList));
    displayData();
}
function visitWeb(i){
    var site = webList[i].url.trim();
    var httpsreg = /^https:\/\//;
    if(httpsreg.test(webList[i].url)) {
    open(""+site)
    }
    else{
    open("https://"+site)
    }
}

function validationUrl(){
        var urlValid =/^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/

    var urlVal = webUrl.value
        if(urlValid.test(urlVal)){
        webUrl.classList.add("is-valid");
        webUrl.classList.remove("is-invalid");
        return true;
    }
    else{
        webUrl.classList.remove("is-valid");
        webUrl.classList.add("is-invalid");
        return false;
    }


}

function validationName(){
        var nameValid =/^.{3,}$/

    var nameVal = bookMarkerName.value
    if(nameValid.test(nameVal)){
        bookMarkerName.classList.add("is-valid");
        bookMarkerName.classList.remove("is-invalid");
        return true;
    }
    else{
        bookMarkerName.classList.remove("is-valid");
        bookMarkerName.classList.add("is-invalid");
        return false;
    }

}
function closeValidationMessage(){
    validationMesg.classList.add("d-none");
}