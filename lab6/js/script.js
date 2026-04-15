function dialogWithUser() {
  var lang = prompt("Яка ваша основна мова програмування?", "");
  if (!lang) {
    alert("Мову не вказано.");
    return;
  }
  var count = parseInt(
    prompt("Скільки разів вивести рядок про IDE? (1–5)", "2"),
    10,
  );
  if (isNaN(count) || count < 1) count = 1;
  if (count > 5) count = 5;
  var i = 0;
  var message = "";
  while (i < count) {
    message += "Мова " + lang + ": використовуйте статичний аналіз і тести.\n";
    i++;
  }
  var ok = confirm(message + "\nВідкрити довідку з репозиторію?");
  if (ok) {
    alert("Дякуємо! Пам’ятайте про ліцензії залежностей.");
  }
}

function showDeveloperInfo(surname, name, position) {
  position = position || "розробник програмного забезпечення";
  var info =
    "Автор матеріалів про ПЗ:\nПрізвище: " +
    surname +
    "\nІм'я: " +
    name +
    "\nПосада: " +
    position;
  alert(info);
  return info;
}

function compareStringsAndAlert(str1, str2) {
  var s1 = String(str1);
  var s2 = String(str2);
  if (s1.length >= s2.length) {
    alert("Довший (або рівний) рядок:\n" + s1);
  } else {
    alert("Довший рядок:\n" + s2);
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
    el.textContent =
      "Модуль оновлено: сумісність з останньою LTS-версією runtime підтверджена.";
  }
}

function demoQuerySelectorAll() {
  var nodes = document.querySelectorAll(".demo-query");
  nodes.forEach(function (node, i) {
    node.textContent = "Компонент " + (i + 1) + ": стан «готово до збірки».";
  });
}

function demoInnerHTML() {
  var box = document.getElementById("box-inner");
  if (box)
    box.innerHTML =
      "<strong>innerHTML</strong>: виправлено <em>CVE</em> у бібліотеці залежностей.";
}

function demoOuterHTML() {
  var box = document.getElementById("box-outer");
  if (box) {
    box.outerHTML =
      "<span id=\"box-outer\">outerHTML: блок замінено на підпис збірки &lt;build #2048&gt;.</span>";
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
    el.textContent = "Статус: готово до релізу (без HTML у рядку).";
  }
}

function demoCreateAndInsert() {
  var container = document.getElementById("insert-demo");
  if (!container) return;
  var p = document.createElement("p");
  var text = document.createTextNode(
    "Подія: успішна збірка артефакту (createElement + createTextNode).",
  );
  p.append(text);
  container.append(p);
  var span = document.createElement("span");
  span.textContent = " [prepend: CI] ";
  container.prepend(span);
  var afterSpan = document.createElement("span");
  afterSpan.textContent = " [after: changelog] ";
  container.after(afterSpan);
}

function demoReplaceWith() {
  var el = document.getElementById("replace-target");
  if (el) {
    var newEl = document.createElement("strong");
    newEl.textContent =
      "replaceWith: запис замінено на «API стабільний, застарілі виклики видалено».";
    el.replaceWith(newEl);
  }
}

function demoRemove() {
  var el = document.getElementById("remove-target");
  if (el) el.remove();
}
