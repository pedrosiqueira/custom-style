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
    document.querySelectorAll(".custom-tabs-bar").forEach(tabBar => {
        const buttons = tabBar.querySelectorAll(".custom-tabs-btn");

        // Attach event listener to each button
        buttons.forEach(button => button.addEventListener("click", () => handleTabClick(button)));

        // Automatically activate the first button in each tab group
        if (buttons.length) handleTabClick(buttons[0]);
    });
}

// Handle tab button click
function handleTabClick(tabButton) {
    const tabBar = tabButton.parentElement;
    const targetTabId = tabButton.getAttribute("aria-custom-tabs-tab");

    // Deactivate all buttons and hide all tabs
    tabBar.querySelectorAll(".custom-tabs-btn").forEach(button => {
        button.classList.remove("custom-tabs-btn-active");
        document.getElementById(button.getAttribute("aria-custom-tabs-tab"))?.style.setProperty("display", "none");
    });

    // Activate clicked button and display corresponding tab content
    tabButton.classList.add("custom-tabs-btn-active");
    document.getElementById(targetTabId)?.style.setProperty("display", "block");
}

// Custom element for footnotes
class FootNote extends HTMLElement {
    static count = 0; // Shared counter for all footnotes
    static footnotes = {};
    static externalLinks = {};

    connectedCallback() {
        const href = this.getAttribute('href');

        if (!(href in FootNote.footnotes)) {
            FootNote.footnotes[href] = ++FootNote.count;
            try {
                document.querySelector(href)?.insertAdjacentHTML('afterbegin', `<sup>[${FootNote.footnotes[href]}]</sup>`);
            } catch {
                FootNote.externalLinks[href] = true; // External reference case
            }
        }

        this.innerHTML = `<sup><a href="${href}" ${FootNote.externalLinks[href] ? 'target="_blank"' : ''}>[${FootNote.footnotes[href]}]</a></sup>`;
    }
}

// Function to enable copy-to-clipboard on elements with 'ctc' attribute
function enableClipboardCopy() {
    document.querySelectorAll('[ctc]').forEach(el => {
        el.setAttribute('tabindex', '0'); // https://stackoverflow.com/a/21200841/28627307
        el.addEventListener('click', ev => {
            ev.preventDefault();
            navigator.clipboard.writeText(ev.target.innerText);
        });
    });
}

// Initialize components when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    enableClipboardCopy();
    customElements.define('foot-note', FootNote);
    initCustomTabs();
});