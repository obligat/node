let obj = {
    username: "ddd",
    age: 5
};


function render(str, data) {
    let tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, group) {
        return "'+obj." + group + "+'";
    });

    tpl = "let tpl ='" + tpl + "'\n return tpl;";

    let compile = new Function('obj', tpl);
    return compile(data);
}


let result = render("hello <%=username%> <%=age%>", obj);

console.log(result);