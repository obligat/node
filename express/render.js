var obj = {
    username: "ddd",
    age: 5
};


function render(str, data) {
    var tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, group) {
        return "'+obj." + group + "+'";
    });

    tpl = "var tpl ='" + tpl + "'\n return tpl;";

    var compile = new Function('obj', tpl);
    return compile(data);
}


var result = render("hello <%=username%> <%=age%>", obj);

console.log(result);