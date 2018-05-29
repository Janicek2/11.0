$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() *chars.length)];
    }
    return str;
  }
  randomString();

  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
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
          self.addCard(new Card(input));
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
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      var $card = $('<li>').addClass('card restored-item');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('card-delete').append('<i class="fa fa-minus"></i>');
      var $cardEdit = $('<button>').addClass('edit').append('<i class="fa fa-pencil"></i>');

      $cardDelete.click(function () {
        self.removeCard();
      });

      $cardEdit.click(function () {
        self.cardEdit($cardDescription);
      });

      $card.append($cardDelete)
      .append($cardDescription)
      .append($cardEdit);
      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    },

    cardEdit: function(newDescription) {
      var $newDescription = prompt('Edytuj swoją kartę', newDescription.text());
      if ($newDescription !== null && $newDescription !== "") {
        this.$element.children('p').text($newDescription);
      }
    }
  };

  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      forcePlaceholderSize: true,
      dropOnEmpty: true,
      tolerance: 'intersect'
    })
    .disableSelection();
  }

  $('.create-column').click(function() {
    var name = prompt('Wpisz nazwę kolumny');
    if (name) {
      var column = new Column(name);
      board.addColumn(column);
    }  else if (name === "") {
      alert('No co Ty. Podaj nazwę');
    }
  });

  var todoColumn = new Column('Weźmy się i zróbmy');
  var doingColumn = new Column('Może jutro?');
  var doneColumn = new Column('I można zapomnieć');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  var card1 = new Card('Dodaj zadanie');
  var card2 = new Card('Przenieś mnie');
  var card3 = new Card('Edytuj albo zapomnij');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});