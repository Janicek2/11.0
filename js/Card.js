function Card(id, name) {
  var self = this;
	this.id = id;
	this.name = name;
	this.$element = createCard();

  function createCard() {
    var $card = $('<li>').addClass('card restored-item');
    var $cardDescription = $('<p>').addClass('card-description').text(self.name);
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
      var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.$element.remove();
      }
    });
    },

    cardEdit: function(newDescription) {
      var $newDescription = prompt('Edytuj swoją kartę', newDescription.text());
      var self = this;
      if ($newDescription !== null && $newDescription !== "") {
        $.ajax({
          url: baseUrl + '/card/' + self.id,
          method: 'PUT',
          data: {
            name: $newDescription,
            bootcamp_kanban_column_id: columnID
          },
          success: function (response) {
            self.$element.children('p').text($newDescription);
          }
        });
      }
    }
  };
