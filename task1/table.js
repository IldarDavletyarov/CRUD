function getStorage() {//get array
    return JSON.parse(localStorage.getItem("table"));
}
function updateStorage(storage) {//update array in local storage
    localStorage.setItem("table", JSON.stringify(storage));
}
function deleteLine(event) {//handler for button delete
    let id = event.target.getAttribute("id");
    let storage = getStorage();
    storage.splice(id, 1);
    updateStorage(storage);
    renderTable();
}

function editLine(event) {//handler for edit button
    if (document.getElementById(formEdit.options.id)||document.getElementById(formAdd.options.id))
        return false;
    else {
        let id = parseInt(event.target.getAttribute("id"));
        formEdit.options["idEdit"] = id;
        let line = getStorage()[id];
        formEdit.options["data"] = {name: line[0], address: line[1], phone: line[2]};
        document.body.appendChild(formEdit.getElem());
    }
}

function renderTable() {//render and display table with buttons
    let tmpl = '<table class="table"><thead class="thead-dark"><tr><th><h3>Full name</h3></th><th><h3>Address</h3></th><th><h3>Phone</h3></th><th><button id="btnAdd" class="btn btn-primary">Add</button></th></tr></thead><%let counter=-1; items.forEach(function(item) {counter++; %><tr> <td><%-item[0]%></td> <td><%-item[1]%></td> <td><%-item[2]%></td><td><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-outline-info"  id="<%-counter%>E">Edit</button>  <button type="button" class="btn btn-outline-danger"   id="<%-counter%>D">Delete</button></div></td></tr>    <% }); %></table>';
    let storage = getStorage()
    if(!storage)//if is empty
        storage=[];
    let html = _.template(tmpl)({
        items: storage
    });
    let table = document.getElementById("table");
    table.innerHTML = html;
    for (let i = 0; i < storage.length; i++) {
        let btnD = document.getElementById(i + "D");
        btnD.addEventListener("click", deleteLine);
        let btnE = document.getElementById(i + "E");
        btnE.addEventListener("click", editLine);
    }
    let btn = document.getElementById("btnAdd");
    btn.addEventListener("click", function () {
        if (document.getElementById(formAdd.options.id)||document.getElementById(formEdit.options.id))
            return false;
        document.body.appendChild(formAdd.getElem());
    });

}

function handlerAdd(form) {//for button Add
    let data = new FormData(form);//get data after submit
    let dataArr = [];//form data to array
    data.forEach(x => dataArr.push(x));
    let storage = getStorage();
    if (!storage) {//first try
        updateStorage([]);
        storage = [];
    }
    storage.push(dataArr);
    updateStorage(storage);
    renderTable();
    form.parentNode.parentNode.removeChild(form.parentNode);
}

function handlerEdit(form) {//for button Edit
    let data = new FormData(form);
    let dataArr = [];
    data.forEach(x => dataArr.push(x));
    let id = formEdit.options.idEdit;
    let storage = getStorage();
    storage[id] = dataArr;
    updateStorage(storage);
    renderTable();
    form.parentNode.parentNode.removeChild(form.parentNode);
}

let formAdd = new Form({//form for add line
    title: "Add line"
    , id: "formAdd"
    , submit: handlerAdd
});
let formEdit = new Form({//form for edit exist line
    title: "Edit line"
    , id: "formEdit"
    , submit: handlerEdit
});
renderTable();//initial render table with open page