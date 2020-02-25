var el = document.getElementById("tag-buttons");

el.addEventListener("click", function(e) {
  var button = e.target;
  var resetButton = document.querySelector(".reset");
  if (button.getAttribute("data-reset") === "true") {
    // Reset the filters
    var filter = button.getAttribute("data-filter");
    resetButton.classList.add("btn-on");
    resetClass();
    resetFilter(filter);
  } else {
    // Filter the tag
    // when click any tag button, remove btn-off from reset button
    resetButton.classList.remove("btn-on");
    resetButton.classList.add("btn-off");
    if (button.classList.contains("btn")) {
      button.classList.toggle("btn-off");
      button.classList.toggle("btn-on");
    }

    var filter = button.getAttribute("data-filter");
    var tag = button.getAttribute("data-filter-tag");
    filterTag(filter, tag);
  }
});

function resetClass() {
  var tagButtons = document.querySelectorAll(".btn-tag");
  for (i = 0; i < tagButtons.length; i++) {
    tagButtons[i].classList.remove("btn-on");
    tagButtons[i].classList.add("btn-off");
  }
}
// Filter tag
function filterTag(filter, tag) {
  resetFilter(filter);
  var items = document.querySelectorAll("." + filter + " > div");

  for (i = 0; i < items.length; i++) {
    var itemTags = items[i].getAttribute("data-tags");

    // Catch case with no tags
    if (itemTags != null) {
      if (itemTags.indexOf(tag) < 0) {
        items[i].setAttribute("data-toggle", "off");
      }
    }
  }
}

// Reset filters
function resetFilter(filter) {
  var items = document.querySelectorAll("." + filter + " > div");

  for (var i = 0; i < items.length; i++) {
    items[i].setAttribute("data-toggle", "on");
  }
}
