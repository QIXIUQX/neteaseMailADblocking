// ==UserScript==
// @name         网易邮箱广告屏蔽
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽网易邮箱的邮箱推荐、顶部导航的网易严选，应用中心，左侧导航的办公模板广告
// @author       You
// @match        https://mail.163.com/*
// @icon         https://mail.163.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  window.onload = function () {
    // 页面广告元素隐藏
    pageAdEl();
    // 导航
    navItemEl();
  };

  /**
   * 隐藏页面中的广告
   */
  let pageAdEl = function () {
    let bottom = document.querySelector(".gWel-bottom");
    let adElWrap = document.querySelector(".gWel-recommend");
    let vipEl = document.querySelector("#_mail_component_128_128");
    if (adElWrap) {
      bottom.removeChild(adElWrap);
    }
    if (vipEl) {
      vipEl.style.display = "none";
    }
    let tree = document.querySelector(".nui-tree");
    let treeEl = document.querySelectorAll(".nui-tree-item-text");
    for (let i = treeEl.length - 1; i > 0; i--) {
      if (treeEl[i].outerText === "办公模板") {
        tree.removeChild(tree.children[i]);
      }
    }
  };

  /**
   * 顶部导航移除广告
   */
  let navItemEl = function () {
    let navWrap = document.querySelector(".js-component-tab");
    if (navWrap) {
      let navItemArr = navWrap.querySelectorAll("li");
      if (navItemArr.length > 0) {
        for (let i = 0; i < navItemArr.length; i++) {
          if (navItemArr[i].title === "网易严选") {
            navWrap.removeChild(navItemArr[i]);
          }
          if (navItemArr[i].title === "应用中心") {
            navWrap.removeChild(navItemArr[i]);
          }
        }
      }
    }
  };
})();
