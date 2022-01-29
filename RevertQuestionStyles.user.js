// ==UserScript==
// @name         Revert Stack Exchange question styles
// @namespace    https://stackoverflow.com/users/6632744/joundill
// @version      0.0.0
// @description  The new question styles make the site harder to use, this script aims to revert those changes.
// @author       Joundill
// @match        https://stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .s-post-summary--stats {
            display:flex;
            flex-direction:row;
            width: 25%;
            align-items: baseline;
        }

        .s-post-summary--stats .s-post-summary--stats-item {
            width: 33%;
            display: block;
            border: none;
            white-space: initial;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .s-post-summary--stats-item-num {
            font-size: 1.5em;
        }

        .s-post-summary--stats-item-name {
            font-size: 0.9em;
            padding-top: 0.2em;
        }

        .s-post-summary--stats-item__emphasized {
            color: inherit !important;
        }
    `);

    let formatStats = () => {
        console.log('formatting...');
        let contentPattern = /(\d+\w?)\s+(\w+)/
        let statsItems = [...document.getElementsByClassName('s-post-summary--stats-item')];
        statsItems.forEach((statsItem) => {
            let statsText = statsItem.textContent.trim();
            let matches = statsText.match(contentPattern);
            if(!matches) return;

            let statNumElement = document.createElement('div');
            let statNameElement = document.createElement('div');

            statNumElement.textContent = matches[1];
            statNumElement.className = 's-post-summary--stats-item-num';

            statNameElement.textContent = matches[2];
            statNameElement.className = 's-post-summary--stats-item-name';

            statsItem.textContent = "";
            statsItem.append(statNumElement);
            statsItem.append(statNameElement);
        });
    }

    // Yeah, yeah. I know. I'll work out what I need to hook this into at some point.
    setTimeout(formatStats, 500);
    formatStats();

})();
