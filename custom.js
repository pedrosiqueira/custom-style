function createHeadings(divWithDataHeading, chapterNumber = null) {
    wrapDivs(document.querySelector(divWithDataHeading), 1, chapterNumber);
}

function wrapDivs(div, level = 1, currentChapter = null) {
    const dataHeading = div.getAttribute("data-heading");

    if (dataHeading) { // If there is a heading (data-heading) in the div
        const heading = document.createElement(`h${level}`);

        heading.textContent = currentChapter ? `${currentChapter} ${dataHeading}` : dataHeading; // If currentChapter exists, prepend it; otherwise, just show the heading

        div.insertBefore(heading, div.firstChild); // Insert the heading at the beginning of the div
    }

    const childDivs = div.querySelectorAll(":scope > div[data-heading]"); // Recursively process child divs
    childDivs.forEach((childDiv, index) => { // Use 'index' as the enumerated position of the childDiv
        wrapDivs(childDiv, level + 1, currentChapter ? `${currentChapter}.${index + 1}` : null);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    for (el of document.querySelectorAll('[ctc]')) {
        el.title = 'Click to copy';
        el.addEventListener('click', ev => {
            ev.preventDefault();
            navigator.clipboard.writeText(ev.target.innerText);
        })
    }
}, false);
