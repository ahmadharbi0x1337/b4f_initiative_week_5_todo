// Tasks Table

export const renderTable = (id, data) => {
  const table = document.getElementById(id);
  table.classList.add("table");
  table.innerHTML = "";
  //create table header
  const header = document.createElement("thead");
  const tr = document.createElement("tr");
  // extract headers from one object
  Object.keys(data[0]).map((key) => {
    const th1 = document.createElement("th");
    th1.innerHTML = key;
    tr.append(th1);
  });
  header.append(tr);
  table.append(header);
  //create table body
  const body = document.createElement("tbody");
  data.map((trObj) => {
    const trs = document.createElement("tr");
    Object.values(trObj).map((d) => {
      const td = document.createElement("td");
      td.innerHTML = d;
      trs.append(td);
    });
    body.append(trs);
  });
  table.append(body);
};
