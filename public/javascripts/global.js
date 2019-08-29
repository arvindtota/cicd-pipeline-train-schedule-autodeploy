var userListData = [];

$(document).ready(function() {

  populateTrains();

});

function populateTrains() {
  var trainsContent = '';

  $.getJSON( '/trains', function( data ) {

  	trains = data

    $.each(data, function(index){
      trainsContent += '<div class="p-2"><a href="#" class="linkshowtrain" rel="' + index + '">' + this.name + '</a></div>';
    });
    $('#trains').html(trainsContent);
    $('#trains').on('click', 'div a.linkshowtrain', showTrainInfo);
  });
};

function showTrainInfo(event) {
	event.preventDefault();
	var train = trains[$(this).attr('rel')];
	var tableContent = '<table class="table"><tr><th>Plan</th></tr>';
	$.each(train.stops, function(index){
      tableContent += '<tr>';
      tableContent += '<td><strong>' + this.plan + '</strong></td>';
      var onTime = (this.price == 'ON-TIME');
      tableContent += '<td style="color: ' + ((onTime) ? 'green' : 'red') + '">' + this.price + '</td>';
      tableContent += '<td>Lines ';
      if (onTime || this.lines == this.delayedLines) {
        tableContent += this.lines;
      } else {
        tableContent += '<span style="text-decoration: line-through">' + this.lines + '</span> ' + this.delayedLines;
      }
      tableContent += '</td>';
      tableContent += '<td>Features ';
      if (onTime || this.features == this.delayedFeatures) {
        tableContent += this.features;
      } else {
        tableContent += '<span style="text-decoration: line-through">' + this.features + '</span> ' + this.delayedFeatures;
      }
      tableContent += '</td>';
      tableContent += '</tr>';
    });
    tableContent += '</table>';
	$('#trainName').text(train.name);
	$('#trainSchedule').html(tableContent);
}
