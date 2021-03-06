// ==UserScript==
// @name         Radiator
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        http://radiator.app.betfair/dashboard/radiator/EDW%20NJ/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moshmage/RadiatorFun/master/radiator-fun.user.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function parentNode(parentsUp, selector, element) {
  var ele, found = false;
  for (parentsUp; parentsUp >= 0; parentsUp--) {
    ele = (ele) ? ele.parentNode : element.parentNode;
    if (ele.className.indexOf(selector) >= 0) {
      found = ele;
    }
  }
  return found;
}

function findFailNodes() {
  var failNode;
  var failingBoxes = [];

  [].forEach.call(document.querySelectorAll('.fail'), function (element) {
    failNode = parentNode(3,'steps',element)
    if (failNode) {
      failingBoxes.push(failNode);
    }
  });

  return failingBoxes;
};

function findFailTests() {
  var failTest;
  var failingBoxes = [];

  [].forEach.call(document.querySelectorAll('.fail-holder'), function (element) {
    failTest = element.querySelector('.testbox div');
    if (failTest) {
      failingBoxes.push(failTest);
    }
  });
  return failingBoxes;
}

function findSuccessNodes() {
  var node;
  var successBox = [];
  [].forEach.call(document.querySelectorAll('.steps'), function (element) {
    node = element.querySelectorAll('.succ-holder');
    if (node.length === 4) {
      successBox.push(element);
    }
  });
  return successBox;
}

var rfun = {
  nyan: function (node) {
    var parent, tests;
    [].forEach.call(document.querySelectorAll('.header.wip'),function (element) {
      parent = parentNode(2, 'steps', element);
      if (parent.querySelector('img') == null) {
        parent.querySelector('.test .-holder').insertAdjacentHTML('afterbegin','<img src="//media.giphy.com/media/sIIhZliB2McAo/giphy.gif"></img>');
      }
    });
  },
  travolta: function (node) {
    var travoltaExists;
    [].forEach.call(node.querySelectorAll('.test .td.-holder'), function (element) {
      if (!travoltaExists && !element.innerText) {
        element.innerHTML = '<img width="130px" src="//i.imgur.com/e1IneGq.gif"></img>';
        travoltaExists = true;
      }
    });
  },
  evenCry: function (node) {
    if (node.querySelector('img') == null) {
      node.insertAdjacentHTML('afterbegin',"<img src='http://fineartamerica.com/images/artworkimages/square/1/even-an-android-can-cry-brian-middleton.jpg' style='position:absolute; left: 5px;'></img>");
    }
  },
  chuckNorrisSuccess: function (node) {
    if (node.querySelector('img') == null) {
      node.querySelector('.comment').insertAdjacentHTML('afterbegin','<img src="//i.imgur.com/tAyEWse.gif"></img>');
    }
  }
};

setInterval(function () {
findFailNodes().forEach(function(node) {
  rfun.travolta(node);
});

findFailTests().forEach(function (node) {
  rfun.evenCry(node);
});

findSuccessNodes().forEach(function (node) {
  rfun.chuckNorrisSuccess(node);
});

rfun.nyan();

}, 300);
