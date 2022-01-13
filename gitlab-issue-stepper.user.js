// ==UserScript==
// @name         GitLab issue stepper
// @namespace    peetftp.ddns.net
// @version      0.1
// @description  Appends 'Prev issue' and 'Next issue' buttons to the gitlab issue details page
// @author       Peter Toth
// @match        https://gitlab.com/*/issues/*
// @icon         https://www.google.com/s2/favicons?domain=gitlab.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/peetertoth/gitlab-issue-stepper/main/gitlab-issue-stepper.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/gitlab-issue-stepper/main/gitlab-issue-stepper.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addLinkToBreadcrumbs = function (url, text) {
        const aElement = document.createElement("a");
        aElement.href = url;
        aElement.text = text;
        const liElement = document.createElement("li");
        liElement.appendChild(aElement);

        const ulBreadcrumbs = document.getElementsByClassName("list-unstyled breadcrumbs-list js-breadcrumbs-list")[0];
        ulBreadcrumbs.appendChild(liElement);
    }

    const urlParts = document.URL.split("/")
    const issueCount = +urlParts[urlParts.length - 1];

    if (issueCount - 1 > 0) {
        urlParts.pop();
        urlParts.push(issueCount - 1);
        const urlPrev = urlParts.join("/");

        addLinkToBreadcrumbs(urlPrev, "<< Prev issue");
    }

    urlParts.pop();
    urlParts.push(issueCount + 1);
    const urlNext = urlParts.join("/");

    addLinkToBreadcrumbs(urlNext, ">> Next issue");

})();