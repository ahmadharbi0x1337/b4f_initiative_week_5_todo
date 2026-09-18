import { addListenersToChildren, filterLogic } from "./utils.js";

const filterGroupBtns = () => {
  return `
        <!-- Filter -->
          <span id="filter">
              <button type="button" class="btn btn-danger">All</button>
              <button type="button" class="btn btn-warning">Pending</button>
              <button type="button" class="btn btn-success">In-Progress</button>
              <button type="button" class="btn btn-danger">Completed</button>
          </span>
        `;
};

export const renderFilter = (id) => {
  const filter = document.getElementById(id);
  filter.innerHTML = filterGroupBtns();
  addListenersToChildren(filter, filterLogic);
};
