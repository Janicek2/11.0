function laptop(screen, disk, name, processor) {
    this.screen = screen;
    this.disk = disk;
    this.name = name;
    this.processor = processor;
}

laptop.prototype.screenOnConsole = function() {
    console.log('Nazwa komputera to' + " " + this.name + "Ma on ekran o przekątnek" + " " + this.screen + " " + "maon dysk o pojemności" + " " + this.disk + "oraz procesor" + this.processor);
};

var dell = new laptop ("13", "SSD", "Dell", "I5");
var Mcbook = new laptop ('14', 'HD', 'Mcbook', 'I6');
var Zenit = new laptop ('16', 'SSD', 'Zenit', 'I3');

dell.screenOnConsole();
Mcbook.screenOnConsole();
Zenit.screenOnConsole();