var url = "../images.json";
/**
 * On DOM content loaded
 */
document.addEventListener('DOMContentLoaded', function(){
    var service = new Service();
    var imageURL = url;
    service.getData(imageURL);
});

/**
 * @function : AJAX service
 */
var Service =  function(){

};

/**
 *@function getData : Make an AJAX get request to process data
 * @param url
 */
Service.prototype.getData = function(url){
    makeAJAXCall('GET', url);
};

/**
 * @function Definition for the AJAX call
 * @param HTTPVerb
 * @param url
 * @param data
 */
function makeAJAXCall(HTTPVerb, url, data){
    var xhr = new XMLHttpRequest();
    xhr.open(HTTPVerb, url);
    xhr.addEventListener('readystatechange',function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                arrangeDOM(xhr.response);
            }
        }
    });
    xhr.send();
}

/**
 * @function Arrange new created DOM elements
 * @param json
 */
function arrangeDOM(json){
    var parsed = JSON.parse(json);
    var main = document.getElementById('container');
    var ul = createElement('ul', main, null,null,{"id":"image-container"});
    for(var prop in parsed){
        var li = createElement('li', ul, 'image-container', null , {
            "data-position": prop,
            "id":"list"+prop,
            "ondrop":"drop(event)",
            "ondragover":"allowDrop(event)",
            "ondragstart":"drag(event)",
            "draggable":"true",
            "ondragenter":"dragEnter(event)",
            "ondragleave":"dragLeave(event)"
        });
        var img = createElement('img', li, 'image', null, {
            "src":parsed[prop]["url"],
            "data-position": prop,
            "id": "Image"+prop ,
            "title": parsed[prop].title
        });
    }
}

/**
 * @function create DOM //
 * @param elementType
 * @param parent
 * @param className
 * @param innerHTML
 * @param custom
 * @returns {HTMLElement}
 */
function createElement(elementType, parent, className, innerHTML, custom) {
    var element = document.createElement(elementType);
    if (parent) parent.appendChild(element);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    if (typeof custom !== 'undefined') {
        for (var prop in custom) {
            element.setAttribute(prop, custom[prop]);
        }
    }
    return element;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var ul = document.getElementById('image-container');
    var targetParent = ev.target.parentNode;
    var newChild = document.getElementById(data);
    var prevParent = newChild.parentNode;
    var targetParentRect = targetParent.getBoundingClientRect();
    var prevParentRect = prevParent.getBoundingClientRect();
    if(targetParent != ul && prevParent !=ul ){
        if(targetParentRect.top < prevParentRect.top || targetParentRect.right < prevParentRect.right){
            ul.insertBefore(prevParent,targetParent);
        }else{
            ul.insertBefore(prevParent,targetParent.nextSibling);
        }
    }

    ul.childNodes.forEach(function(elem){
        elem.classList.remove('drag-over');
    });
}

function dragEnter(ev){
    ev.target.parentNode.classList.add('drag-over');
}
function dragLeave(ev){
    ev.target.parentNode.classList.remove('drag-over');
}