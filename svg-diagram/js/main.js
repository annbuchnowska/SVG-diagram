
document.getElementById('value').addEventListener('change', function() { 
  var val = parseInt( this.value ),
      circle = document.getElementsByClassName('path')[0],
      circle2 = document.getElementsByClassName('path2')[0]; //small circle
      
  if (isNaN(val)) {
   val = 100; 
  }
  else{
    var r = circle.getAttribute('r');
    var r2 = circle2.getAttribute('r'); //2nd circle radius -> value  > 100%
    var c = Math.PI*(r*2);
    var c2 = Math.PI*(r2*2); //2nd circumference -> value > 100%
    var diagram = document.getElementById('diagram');   
   
   
    if (val < 0 || val > 200) { val = 0;}
    if (val >= 100) { 
      var val2 = val - 100;
      var val = 100;
      var pct = ((100-val)/100)*c;
      var pct2 = (((100-val2)/100)*c2);
      circle.style.strokeDashoffset = pct;
      circle2.style.strokeDashoffset = pct2;      
      diagram.setAttribute('data-pct', val2 + 100);
    }
    if (val < 100) {
      var pct = ((100-val)/100)*c;    
      circle.style.strokeDashoffset =  pct;
      circle2.style.strokeDashoffset = 776;
      diagram.setAttribute('data-pct', val);      
    }
  }
});

/* jquery version

$('#value').on('change', function() {
  var val = parseInt($(this).val()),
  var $circle = $('.path'),
  var $circle2 = $('.path2'); //small circle
  
  if (isNaN(val)) {
   val = 100; 
  }
  else{
    var r = $circle.attr('r');
    var r2 = $circle2.attr('r'); //2nd circle radius -> value  > 100%
    var c = Math.PI*(r*2);
    var c2 = Math.PI*(r2*2); //2nd circumference -> value > 100%
   
    if (val < 0 || val > 200) { val = 0;}
    if (val >= 100) { 
      var val2 = val - 100;
      var val = 100;
      var pct = ((100-val)/100)*c;
      var pct2 = (((100-val2)/100)*c2);
      $circle.css({ strokeDashoffset: pct});
      $circle2.css({ strokeDashoffset: pct2});      
      $('#diagram').attr('data-pct', val2 + 100);
    }
    if (val < 100) {
      var pct = ((100-val)/100)*c;    
      $circle.css({ strokeDashoffset: pct});
      $circle2.css({ strokeDashoffset: 776});
      $('#diagram').attr('data-prt', val);     
    }
  }
});

*/

