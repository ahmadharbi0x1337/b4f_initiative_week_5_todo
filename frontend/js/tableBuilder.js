// General Table Builder

import { addListenersToChildren } from "./utils.js";

export const renderTable = (id, data = [], callBack) => {
  const parent = document.getElementById(id);
  // handle empty data gracefully
  if (data.length == 0) {
    parent.innerHTML = `
    <div class="container-fluid">
    <span class="badge rounded-pill text-bg-warning">No Data Available</span>
    </div>
    `;
    return;
  }
  parent.innerHTML = "";
  const table = document.createElement("table");
  table.classList.add("table");
  //create table header
  const header = document.createElement("thead");
  const tr = document.createElement("tr");
  // extract headers from one object
  // Note: if you try to do this on an empty array, then accessing data[0] will result to undefined
  // console.log(data[0]); // output: undefined
  // thus throwing the error message :
  // Uncaught (in promise) TypeError: Cannot convert undefined or null to object
  Object.keys(data[0]).forEach((key) => {
    const th = document.createElement("th");
    th.innerHTML = key.toUpperCase();
    tr.append(th);
  });
  header.append(tr);
  table.append(header);
  //create table body
  const body = document.createElement("tbody");
  data.forEach((trObj) => {
    // create rows
    const tr = document.createElement("tr");
    // extract data
    Object.values(trObj).forEach((cellData) => {
      // created cells and attach data
      const td = document.createElement("td");
      if (cellData === Object(cellData)) {
        td.innerHTML = Object.values(cellData).join("");
        addListenersToChildren(td, callBack);
      } else {
        td.innerHTML = cellData;
      }
      tr.append(td);
    });
    body.append(tr);
  });
  table.append(body);
  parent.append(table);
};
