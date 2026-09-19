import { addListenersToChildren } from "./utils.js";

const filterGroupBtns = () => {
  return `
          <span id="filter">
              <button type="button" class="btn btn-danger">All</button>
              <button type="button" class="btn btn-warning">Pending</button>
              <button type="button" class="btn btn-success">In-Progress</button>
              <button type="button" class="btn btn-danger">Completed</button>
          </span>
        `;
};

const filterLogic = (pointerEvent = PointerEvent) => {
  // First Query All Rows in an Array, then Hide ones that doesn't match status string
  const status = pointerEvent.target.textContent.toLowerCase();
  const [headers, ...rows] = Array.from(document.querySelectorAll("tr"));
  if (status == "all") {
    // loop and remove the hidden or display none style, or re-Render the Table again
    rows.forEach((row) => {
      row.style.display = "";
    });
    return;
  } else {
    // console.log(headers);
    rows.forEach((row) => {
      const rawData = Array.from(row.children).map((td) => {
        return td.textContent;
      });
      if (!rawData.includes(status)) {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  }
};
export const renderFilter = (id) => {
  const filter = document.getElementById(id);
  filter.innerHTML = filterGroupBtns();
  addListenersToChildren(filter, filterLogic);
};
