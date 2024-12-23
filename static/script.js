`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`tr`);
  child.id = item._id;
  // child.innerHTML = `${JSON.stringify(item)}`;
  let parsedData = item;
  for (let key in parsedData) {
    let row = document.createElement(`td`);
    row.innerHTML = parsedData[key];
    child.appendChild(row);
  }
  DOM.tablebody.appendChild(child);
}

// GET all function
const get = () => {
  while (DOM.tablebody.hasChildNodes()) {
    DOM.tablebody.removeChild(DOM.tablebody.firstChild);
  }
  console.log(DOM.tablebody);

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }

      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  axios.post(`/create`, {
    name: DOM.inputName.value,
    description: DOM.inputDescription.value,
    price: DOM.inputPrice.value
  })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// GET one function
const getOne = () => {
  axios.get(`/read/${DOM.inputID.value}`)
    .then((response) => {
      DOM.singleOutput.innerHTML = JSON.stringify(response.data);
    }).catch((err) => {
      console.log(err);
    });
}

// PUT function
const put = () => {
  axios.put(`/update/${DOM.inputUpdateID.value}`, {
    name: DOM.inputUpdateName.value,
    description: DOM.inputUpdateDescription.value,
    price: DOM.inputUpdatePrice.value
  })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// DELETE function
const del = () => {
  axios.delete(`/delete/${DOM.inputDeleteID.value}`)
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// DELETE ALL function
const delAll = () => {
  axios.delete(`/deleteAll`)
  .then((response) => {
    console.log(response);

    //clears the html table

    while (DOM.tablebody.hasChildNodes()) {
      DOM.tablebody.removeChild(DOM.tablebody.firstChild);
    }
    console.log(DOM.tablebody);

  }).catch((err) => {
    console.log(err);
  });
}


// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonReadOne.onclick = () => getOne();
DOM.buttonUpdate.onclick = () => put();
DOM.buttonDelete.onclick = () => del();
DOM.buttonReadAll.onclick = () => get();
DOM.buttonDeleteAll.onclick = () => delAll();