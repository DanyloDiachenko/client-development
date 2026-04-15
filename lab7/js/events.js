function handlerViaAttribute() {
  console.log("Обробник через атрибут onclick (інтерфейс ПЗ).");
  alert("Дію виконано через атрибут onclick.");
}

function handlerViaProperty() {
  console.log("Обробник через властивість .onclick.");
  alert("Дію призначено через властивість .onclick.");
}

function handlerOne() {
  console.log("addEventListener: перевірка цілісності маніфесту");
}

function handlerTwo() {
  console.log("addEventListener: аудит залежностей");
}

var eventCounter = 0;
function handlerThree() {
  eventCounter++;
  console.log("addEventListener: запис у журнал подій, виклик " + eventCounter);
}

var handlerObject = {
  handleEvent: function (event) {
    var el = event.currentTarget;
    alert(
      "handleEvent: елемент керування " +
        el.tagName +
        (el.id ? " id=\"" + el.id + "\"" : "") +
        " (облік дій користувача).",
    );
    console.log("currentTarget:", el);
  },
};

function setupObjectListener() {
  var btn = document.getElementById("btn-handler-object");
  if (btn && !btn._objectListenerAdded) {
    btn.addEventListener("click", handlerObject);
    btn._objectListenerAdded = true;
    alert("Додано обробник-об'єкт для кнопки керування ПЗ.");
  }
}

function removeObjectListener() {
  var btn = document.getElementById("btn-handler-object");
  if (btn && btn._objectListenerAdded) {
    btn.removeEventListener("click", handlerObject);
    btn._objectListenerAdded = false;
    alert("Обробник знято через removeEventListener.");
  }
}

function initListDelegation() {
  var list = document.getElementById("click-list");
  if (!list) return;
  list.onclick = function (event) {
    var target = event.target;
    if (target.tagName === "LI") {
      var items = list.querySelectorAll("li");
      items.forEach(function (item) {
        item.classList.remove("highlight");
      });
      target.classList.add("highlight");
    }
  };
}

function menuClick(event) {
  var target = event.target;
  if (target.tagName !== "BUTTON") return;
  var action = target.getAttribute("data-action");
  if (!action) return;
  if (action === "save") {
    alert("Операція: збережено package.json у репозиторії.");
  } else if (action === "load") {
    alert("Операція: завантажено залежності (npm/pip тощо).");
  } else if (action === "clear") {
    alert("Операція: очищено кеш збірки CI.");
  } else if (action === "export") {
    alert("Операція: експортовано SBOM для аудиту ПЗ.");
  }
}

function initBehavior() {
  document.body.addEventListener("click", function (event) {
    var target = event.target.closest("[data-behavior]");
    if (!target) return;
    var behavior = target.getAttribute("data-behavior");
    if (behavior === "toggle-text") {
      var next = target.getAttribute("data-next") || "Текст змінено.";
      var prev = target.getAttribute("data-prev") || "Клікніть.";
      if (target.textContent.trim() === prev) {
        target.textContent = next;
      } else {
        target.textContent = prev;
      }
    } else if (behavior === "log-id") {
      var id = target.getAttribute("data-id") || "";
      console.log("Модуль ПЗ, data-id:", id);
      alert("Ідентифікатор модуля: " + id);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var btnProperty = document.getElementById("btn-via-property");
  if (btnProperty) {
    btnProperty.onclick = handlerViaProperty;
  }
  var btnMulti = document.getElementById("btn-multiple-handlers");
  if (btnMulti) {
    btnMulti.addEventListener("click", handlerOne);
    btnMulti.addEventListener("click", handlerTwo);
    btnMulti.addEventListener("click", handlerThree);
  }
  initListDelegation();
  var menu = document.getElementById("behavior-menu");
  if (menu) {
    menu.addEventListener("click", menuClick);
  }
  initBehavior();
});
