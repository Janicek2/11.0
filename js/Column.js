function Column(id, name) {
var self = this;

this.id = id;
var columnID = id;
this.name = name || 'No name given';
this.$element = createColumn();


function createColumn() {
  var $column = $('<div>').addClass('column');
  var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
  var $columnCardList = $('<ul>').addClass('column-card-list');
  var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="fa fa-trash-o"></i>');
  var $columnAddCard = $('<button>').addClass('add-card').text('+');

$columnDelete.click(function () {
  self.removeColumn();
});

$columnAddCard.click(function(event) {

  var input = prompt("Wpisz nazwę kolumny");

  if (input) {
    $.ajax({
      url: baseUrl + '/card',
      method: 'POST',
      data: {
        name: cardName,
        bootcamp_kanban_column_id: id
      },
      success: function(response) {
        var card = new Card(response.id, cardName, columnID);
        self.addCard(card);
      }
    });
  } else if (input === "") {
    alert('Popraw nazwę');
  }}
);

$column.append($columnDelete)
.append($columnTitle)
.append($columnAddCard)
.append($columnCardList);
return $column;
}
}

Column.prototype = {
  addCard: function(card) {
    this.$element.children('ul').append(card.$element);
  },
  removeColumn: function () {
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response){
        self.element.remove();
      }
    });
  }
};
