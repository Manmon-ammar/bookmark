//& HTML elements 
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableBody = document.getElementById("tableBody");
var visitBtn = document.getElementById("visitBtn");
var deleteBtn = document.getElementById("deleteBtn");
//^ app variables
var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [] ;
displayAllBookmarks();
var siteNameRegex = /^[A-Za-z]{4,}$/
var siteUrlRegex = /^(https?:\/\/)?(www\.)?[a-z]+\.(com|net)$/
//! functions 
function saveBookmark() {
    if(validation(siteNameRegex , siteName) && validation(siteUrlRegex , siteUrl)){
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length -1);
        clearInputs();
    } else{
        alert("Invalid input");
    }  
}
function displayBookmark(index) {
    var bookmarkRow = `
    <tr class="border-bottom">
        <td class="text-center p-2">${index +1}</td>
        <td class="text-center p-2">${bookmarks[index].name}</td>
        <td class="text-center p-2"><a target="_blank" href="${bookmarks[index].url}"><button class="btn btn-success" type="button" id="visitBtn"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td class="text-center p-2"><button class="btn btn-danger" type="button" id="deleteBtn" onclick="deleteBookmark(${index})"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>
    `
    tableBody.innerHTML += bookmarkRow;
}
function displayAllBookmarks(){
    for (var i = 0 ; i < bookmarks.length ; i++ ){
        displayBookmark(i);
    }
}
function clearInputs(){
    siteName.value = "";
    siteUrl.value = "";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}
function deleteBookmark(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    tableBody.innerHTML = '';
    displayAllBookmarks();
}
function validation(regex , element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none")
        return false
    }
}