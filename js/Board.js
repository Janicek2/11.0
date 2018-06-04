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
      $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
          name: columnName
        },
        success: function(response) {
          var column = new Column(response.id, columnName);
          board.addColumn(column);
        }
      });
    }  else if (name === "") {
      alert('No co Ty. Podaj nazwę');
    }
  });
