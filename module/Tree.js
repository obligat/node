// exports = module.exports;

var Tree = function (height, age) {
    this._height = height;
    this._age = age;
};

Tree.prototype.getHeight = function () {
    return this._height;
};

Tree.prototype.setHeight = function (height) {
    this._height = height;
};

Tree.prototype.getAge = function () {
    return this._age;
};

Tree.prototype.setAge = function (age) {
    this._age = age;
};

Tree.prototype.color = 'green';
// exports = Tree;   // 将 exports 的引用改了

module.exports = Tree;
// return module.exports;