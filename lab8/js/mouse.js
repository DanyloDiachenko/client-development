(function () {
  function initMouseOverOut() {
    var boxes = document.querySelectorAll(".hover-box");
    var logEl = document.getElementById("log-target");

    function updateLog(msg) {
      if (logEl) logEl.textContent = msg;
    }

    boxes.forEach(function (box) {
      box.addEventListener("mouseover", function (event) {
        event.target.classList.add("hover-active");
        var related = event.relatedTarget ? (event.relatedTarget.id || event.relatedTarget.className || event.relatedTarget.tagName) : "—";
        updateLog("mouseover: target=" + (event.target.id || event.target.className) + ", relatedTarget=" + related);
      });
      box.addEventListener("mouseout", function (event) {
        event.target.classList.remove("hover-active");
        var related = event.relatedTarget ? (event.relatedTarget.id || event.relatedTarget.className || event.relatedTarget.tagName) : "—";
        updateLog("mouseout: target=" + (event.target.id || event.target.className) + ", relatedTarget=" + related);
      });
    });
  }

  function initDragAndDrop() {
    var container = document.querySelector(".drag-source");
    if (!container) container = document.body;
    var dropZones = document.querySelectorAll(".drop-here");
    var dragged = null;
    var offsetX = 0;
    var offsetY = 0;

    document.body.addEventListener("mousedown", function (event) {
      var el = event.target.closest(".draggable");
      if (el) onMouseDown.call(el, event);
    });

    function onMouseDown(event) {
      if (event.button !== 0) return;
      dragged = this;
      var rect = dragged.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      dragged.classList.add("dragging");
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      event.preventDefault();
    }

    function onMouseMove(event) {
      if (!dragged) return;
      event.preventDefault();
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      dragged.style.position = "fixed";
      dragged.style.left = x + "px";
      dragged.style.top = y + "px";
      dragged.style.margin = "0";
      dragged.style.zIndex = "1000";

      dropZones.forEach(function (zone) {
        var r = zone.getBoundingClientRect();
        if (event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom) {
          zone.classList.add("drag-over");
        } else {
          zone.classList.remove("drag-over");
        }
      });
    }

    function onMouseUp(event) {
      if (!dragged) return;
      event.preventDefault();

      var dropped = false;
      dropZones.forEach(function (zone) {
        zone.classList.remove("drag-over");
        var r = zone.getBoundingClientRect();
        if (event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom) {
          var clone = dragged.cloneNode(true);
          clone.classList.remove("dragging");
          clone.classList.add("draggable", "dropped-item");
          clone.style.position = "";
          clone.style.left = "";
          clone.style.top = "";
          clone.style.margin = "";
          clone.style.zIndex = "";
          zone.appendChild(clone);
          dropped = true;
        }
      });

      dragged.style.position = "";
      dragged.style.left = "";
      dragged.style.top = "";
      dragged.style.margin = "";
      dragged.style.zIndex = "";
      dragged.classList.remove("dragging");

      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
      dragged = null;
    }

    dropZones.forEach(function (zone) {
      zone.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMouseOverOut();
    initDragAndDrop();
  });
})();
