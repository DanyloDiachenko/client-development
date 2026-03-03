function dialogWithUser() {
  var name = prompt("Введіть ваше ім'я:", "");
  if (!name) {
    alert("Ім'я не введено.");
    return;
  }
  var count = parseInt(prompt("Скільки разів вивести привітання? (1–5)", "2"), 10);
  if (isNaN(count) || count < 1) count = 1;
  if (count > 5) count = 5;
  var i = 0;
  var message = "";
  while (i < count) {
    message += "Привіт, " + name + "!\n";
    i++;
  }
  var ok = confirm(message + "\nПоказати ще раз?");
  if (ok) {
    alert("Дякуємо за участь!");
  }
}

function showDeveloperInfo(surname, name, position) {
  position = position || "розробник";
  var info = "Розробник сторінки:\nПрізвище: " + surname + "\nІм'я: " + name + "\nПосада: " + position;
  alert(info);
  return info;
}

function compareStringsAndAlert(str1, str2) {
  var s1 = String(str1);
  var s2 = String(str2);
  if (s1.length >= s2.length) {
    alert("Більший (або рівний) рядок:\n" + s1);
  } else {
    alert("Більший рядок:\n" + s2);
  }
}

function changeBackgroundFor30Seconds(color) {
  var doc = document;
  var oldBg = doc.body.style.backgroundColor;
  doc.body.style.backgroundColor = color || "#d5f5e3";
  setTimeout(function () {
    doc.body.style.backgroundColor = oldBg || "";
  }, 30000);
}

function redirectToOtherPage(url) {
  if (url) {
    location.href = url;
  } else {
    location.href = "redirect.html";
  }
}

function demoGetElementById() {
  var el = document.getElementById("demo-id");
  if (el) {
    el.textContent = "Текст змінено через getElementById (textContent).";
  }
}

function demoQuerySelectorAll() {
  var nodes = document.querySelectorAll(".demo-query");
  nodes.forEach(function (node, i) {
    node.textContent = "querySelectorAll: елемент " + (i + 1);
  });
}

function demoInnerHTML() {
  var box = document.getElementById("box-inner");
  if (box) box.innerHTML = "<strong>innerHTML</strong>: можна вставити <em>HTML</em>.";
}

function demoOuterHTML() {
  var box = document.getElementById("box-outer");
  if (box) {
    box.outerHTML = "<span id=\"box-outer\">outerHTML замінив весь елемент на &lt;span&gt;.</span>";
  }
}

function demoNodeValue() {
  var el = document.getElementById("node-value-demo");
  if (el && el.firstChild) {
    var textNode = el.firstChild;
    alert("nodeValue: " + textNode.nodeValue + "\ndata: " + textNode.data);
  }
}

function demoTextContent() {
  var el = document.getElementById("text-content-demo");
  if (el) {
    el.textContent = "Новий текст через textContent (без HTML).";
  }
}

function demoCreateAndInsert() {
  var container = document.getElementById("insert-demo");
  if (!container) return;
  var p = document.createElement("p");
  var text = document.createTextNode("Новий параграф (createElement + createTextNode).");
  p.append(text);
  container.append(p);
  var span = document.createElement("span");
  span.textContent = " [prepend] ";
  container.prepend(span);
  var afterSpan = document.createElement("span");
  afterSpan.textContent = " [after] ";
  container.after(afterSpan);
}

function demoReplaceWith() {
  var el = document.getElementById("replace-target");
  if (el) {
    var newEl = document.createElement("strong");
    newEl.textContent = "replaceWith: старий вузол замінено на цей.";
    el.replaceWith(newEl);
  }
}

function demoRemove() {
  var el = document.getElementById("remove-target");
  if (el) el.remove();
}
