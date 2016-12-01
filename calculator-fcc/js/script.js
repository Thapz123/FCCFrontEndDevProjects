$(document).ready(function() {
  var numpad = document.getElementById("numpad");
  var display = $("#display");
  var numpadClick = numpad.addEventListener("click", calc.doOperation.bind(calc), false);
  console.log("ran");

})
var operators = {
    '+': function(a, b=0) { return a + b },
    '÷': function(a, b=1) { 
          if(b==0)b=1;
          return a / b },
    'x': function(a, b=1) {
        if(b==0)b=1;
        return a * b },
    '-': function(a, b=0) { return a - b },
    '=': function(a, b=0) { return b}
     // ...
};
var calc = {
  init:false,
  total: 0,
  currNum:0,
  currText:"",
  vaildOp:true,
  enteredNum:false,
  
  currOp:"=",
  reloadDisplay:function(op){
    if(operators.hasOwnProperty(op)){
      this.currNum= Number(display.innerText);
      
      if(!this.init){
          this.init= true;
          this.total= operators[op](total,currNum);
          this.currNum=0;
          
      }
      if(op=="="&&this.currOp!="="){
        this.total= operators[op](total,currNum);
      }
      
    }
  },
  
  doOperation: function(e) {
    if (e.target !== e.currentTarget) {
      var operation = e.target.innerText;
      this.reloadDisplay(operation);
      console.log(operation);
      var currText = "";
      isNaN(operation) ? currText = operation : currText = display.innerText + operation;
      display.innerHTML = currText;
    }
    e.stopPropagation();
  }
}