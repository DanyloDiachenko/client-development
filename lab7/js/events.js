function handlerViaAttribute() {
  console.log("Обробник через атрибут onclick.");
  alert("Обробник призначено через атрибут onclick.");
}

function handlerViaProperty() {
  console.log("Обробник через властивість element.onclick.");
  alert("Обробник призначено через властивість .onclick.");
}

function handlerOne() {
  console.log("addEventListener: обробник 1");
}

function handlerTwo() {
  console.log("addEventListener: обробник 2");
}

var eventCounter = 0;
function handlerThree() {
  eventCounter++;
  console.log("addEventListener: обробник 3, виклик " + eventCounter);
}

var handlerObject = {
  handleEvent: function (event) {
    var el = event.currentTarget;
    alert("handleEvent: обробник-об'єкт. Елемент: " + el.tagName + (el.id ? " id=\"" + el.id + "\"" : "") + ".");
    console.log("currentTarget:", el);
  }
};

function setupObjectListener() {
  var btn = document.getElementById("btn-handler-object");
  if (btn && !btn._objectListenerAdded) {
    btn.addEventListener("click", handlerObject);
    btn._objectListenerAdded = true;
    alert("Додано обробник-об'єкт (handleEvent). Клікніть кнопку.");
  }
}

function removeObjectListener() {
  var btn = document.getElementById("btn-handler-object");
  if (btn && btn._objectListenerAdded) {
    btn.removeEventListener("click", handlerObject);
    btn._objectListenerAdded = false;
    alert("Обробник видалено через removeEventListener.");
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
    alert("Метод: Зберегти.");
  } else if (action === "load") {
    alert("Метод: Завантажити.");
  } else if (action === "clear") {
    alert("Метод: Очистити.");
  } else if (action === "export") {
    alert("Метод: Експорт.");
  }
}

function initBehavior() {
  document.body.addEventListener("click", function (event) {
    var target = event.target.closest("[data-behavior]");
    if (!target) return;
    var behavior = target.getAttribute("data-behavior");
    if (behavior === "toggle-text") {
      var next = target.getAttribute("data-next") || "Текст змінено.";
      var prev = target.getAttribute("data-prev") || "Клікніть для зміни.";
      if (target.textContent.trim() === prev) {
        target.textContent = next;
      } else {
        target.textContent = prev;
      }
    } else if (behavior === "log-id") {
      var id = target.getAttribute("data-id") || "";
      console.log("Поведінка data-behavior=log-id, data-id:", id);
      alert("Поведінка: log-id, data-id = " + id);
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
