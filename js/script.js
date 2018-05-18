function Laptop(screen, disk, name, processor) {
    var self = this;
    this.screen = screen;
    this.disk = disk;
    this.name = name;
    this.processor = processor;
}

Laptop.prototype.screenOnConsole = function() {
    console.log('Nazwa komputera to' + " " + this.name + "Ma on ekran o przekątnek" + " " + this.screen + " " + "maon dysk o pojemności" + " " + this.disk + "oraz procesor" + this.processor);
};

Laptop.prototype.inOnStock = function() {
    var stock = Math.round(Math.random());
    console.log(stock);
    if (stock < 1) {
        console.log('Nie ma' + " " + this.name + " " + 'na stanie');
    } else {
        console.log ('Jest' + " " + this.name + " " + 'na stanie');
    }
};

var dell = new Laptop ("13", "SSD", "Dell", "I5");
var mcbook = new Laptop ('14', 'HD', 'Mcbook', 'I6');
var zenit = new Laptop ('16', 'SSD', 'Zenit', 'I3');

dell.screenOnConsole();
mcbook.screenOnConsole();
zenit.screenOnConsole();
dell.inOnStock();
mcbook.inOnStock();
zenit.inOnStock();