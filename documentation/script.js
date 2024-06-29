addEventListener("DOMContentLoaded", e => {
    addGlobalEventListener("click", ".module-ul-title", e => {
        console.log(e.target);
        let classUl = e.target.parentNode.children[1];
        if (classUl.style.display != "none") classUl.style.display = "none";
        else classUl.style.display = "block";
    });
});

function addGlobalEventListener(event, selector, callback) {
    const elements = document.querySelectorAll(selector);

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.addEventListener(event, callback);
    }
}