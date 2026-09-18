// General Table Builder

import { addListenersToChildren, taskCrud } from "./utils.js";

export const renderTable = (id, data = []) => {
  // select, init, and clear table (will refactor to create not to select in future)
  const table = document.getElementById(id);
  table.classList.add("table");
  table.innerHTML = "";
  //create table header
  const header = document.createElement("thead");
  const tr = document.createElement("tr");
  // extract headers from one object
  // Note: if you try to do this on an empty array, then accessing data[0] will result to undefined
  // console.log(data[0]); // output: undefined
  // thus throwing the error message :
  // Uncaught (in promise) TypeError: Cannot convert undefined or null to object
  try {
    if (data.length == 0) {
      throw new Error("You Should Provide a Non-Empty Array Please");
    }
    Object.keys(data[0]).map((key) => {
      const th = document.createElement("th");
      th.innerHTML = key.toUpperCase();
      tr.append(th);
    });
  } catch (err) {
    console.error(err);
  }

  header.append(tr);
  table.append(header);
  //create table body
  const body = document.createElement("tbody");
  data.map((trObj) => {
    // create rows
    const trs = document.createElement("tr");
    // extract data
    Object.values(trObj).map((cellData) => {
      // created cells and attach data
      const td = document.createElement("td");
      if (cellData === Object(cellData)) {
        td.innerHTML = Object.values(cellData).join("");
        addListenersToChildren(td, taskCrud);
      } else {
        td.innerHTML = cellData;
      }
      trs.append(td);
    });
    body.append(trs);
  });
  table.append(body);
};
