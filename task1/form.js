function Form(options) {
    let elem;
    let div;
    let self = this;

    function getElem() {
        //if (!elem)
        render();
        return div;
    }

    function render() {
        div = document.createElement("div");
        elem = document.createElement('form');
        elem.setAttribute("class", "card")
        elem.setAttribute("id", self.options.id);
        addTitle();
        addItem("Full name", "name","Kazan Federal University");
        addItem("Address", "address","Kazan, Kremlevskaya st, 18");
        addPhone("Phone");
        addSubmit("Submit");
        elem.addEventListener("submit", function (event) {
            options.submit(elem);
            event.preventDefault();
        });
        div.className = "container";
        div.appendChild(elem);
    }

    function addTitle() {
        var titleElem = document.createElement('h2');
        elem.appendChild(titleElem);
        titleElem.className = "title";
        titleElem.textContent = self.options.title;
    }

    function addItem(titleName, name,holder) {
        let formGroup = document.createElement("div");
        formGroup.className = "form-group";
        let label = document.createElement("label");
        label.innerText = titleName;
        let small = document.createElement("small");
        small.className="form-text text-muted";
        small.innerText = "Write with any symbols";
        let input = document.createElement("input");
        input.className = "form-control";
        input.setAttribute("name", name);
        input.setAttribute("required", "true");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", holder);
        if (self.options.data)
            input.setAttribute("value", self.options.data[name]);
        input.className = "input";
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        formGroup.appendChild(small);
        elem.appendChild(formGroup);
    }

    function addPhone(titleName) {
        let formGroup = document.createElement("div");
        formGroup.className = "form-group";
        let label = document.createElement("label");
        label.innerText = titleName;
        let small = document.createElement("small");
        small.className="form-text text-muted";
        small.innerText = "Write phone number with 11 digits";
        let input = document.createElement("input");
        input.className = "form-control";
        input.setAttribute("name", "phone");
        input.setAttribute("placeholder", "8123456789");
        input.setAttribute("required", "true");
        input.setAttribute("type", "tel");
        input.setAttribute("pattern", "[0-9]{11}");//need 11 digits
        if (self.options.data)
            input.setAttribute("value", self.options.data.phone);
        input.className = "input";
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        formGroup.appendChild(small);
        elem.appendChild(formGroup);
    }

    function addSubmit(titleName) {
        let submit = document.createElement("input");
        submit.className = "btn btn-primary submit";
        submit.setAttribute("type", "submit");

        submit.innerText = titleName;
        elem.appendChild(submit);
    }

    this.getElem = getElem;
    this.options = options;
}

