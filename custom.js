/* // talvez isso não seja a melhor prática...
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
*/

// Main initialization function
function initCustomTabs() {
    const tabBars = document.querySelectorAll(".custom-tabs-bar");

    tabBars.forEach(tabBar => {
        const buttons = tabBar.querySelectorAll(".custom-tabs-btn");

        // Attach event listener to each button
        buttons.forEach(button => {
            button.addEventListener("click", () => handleTabClick(button));
        });

        // Automatically activate the first button in each tab group
        if (buttons.length > 0) {
            handleTabClick(buttons[0]);
        }
    });
}

// Handle tab button click
function handleTabClick(tabButton) {
    const tabBar = tabButton.parentElement;
    const buttons = tabBar.querySelectorAll(".custom-tabs-btn");
    const targetTabId = tabButton.getAttribute("aria-custom-tabs-tab");
    const targetTabContent = document.getElementById(targetTabId);

    // Deactivate all buttons and hide all tabs
    buttons.forEach(button => {
        button.classList.remove("custom-tabs-btn-active");
        const tabContentId = button.getAttribute("aria-custom-tabs-tab");
        const tabContent = document.getElementById(tabContentId);
        if (tabContent) tabContent.style.display = "none";
    });

    // Activate clicked button and display corresponding tab content
    tabButton.classList.add("custom-tabs-btn-active");
    if (targetTabContent) targetTabContent.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    for (el of document.querySelectorAll('[ctc]')) {
        el.title = 'Click to copy';
        el.addEventListener('click', ev => {
            ev.preventDefault();
            navigator.clipboard.writeText(ev.target.innerText);
        })
    }

    initCustomTabs()
}, false);