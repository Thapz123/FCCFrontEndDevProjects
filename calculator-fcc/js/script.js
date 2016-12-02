$(document).ready(function() {
  var numpad = document.getElementById("numpad");
  var display = $("#display");
  var numpadClick = numpad.addEventListener("click", calc.handleClick.bind(calc), false);
  console.log("ran");

});
var operators = {
    '+': function(a, b=0) { return a + b; },
    '÷': function(a, b=1) { 
          if(b==0)b=1;
          return a / b ;},
    'x': function(a, b=1) {
        
        return a * b ;},
    '-': function(a, b=0) { return a - b; },
    '=': function(a, b=0) { return a;},
    
     // ...
};


var calc = {
  init:false,
  total: 0,
  currNum:0,
  currOp:"",
  // currText:"",
  currNumText:"",
  prev:"",
  clear:function(){
    this.init=false;
    this.total=0;
    this.currNum=0;
    this.currOp="";
    this.currNumText="";
    this.prev="";
    display.innerText="";
  },
  
  doOperation:function(op){
    if(op=="C"){
      this.clear();
    }
    else if(!operators.hasOwnProperty(op)){

      if(!isNaN(op)){
        // this.currText=this.currText+op;

        if(this.prev=="eq"){
          display.innerText="";
          // this.currText="";
          this.total=0;
          this.init=false;
          this.currNum=0;
          this.currNumText="";
        }
        this.currNumText= this.currNumText+op;
        display.innerText=this.currNumText;
        this.prev="num";
      }
      //console.log("num: ", this.currText);


    }
    else{
      this.currText=this.currText+op;

      if(!this.init){
        this.total= Number(this.currNumText);
        this.currOp=op;
        display.innerText="";
        this.currNumText="";
        this.init=true;
      }else{
        if(this.prev=="num"){
          this.currNum=Number(this.currNumText);
        }
        this.currNumText="";
        // console.log("totalB: ", this.total);
        // console.log("currNumB: ",this.currNum);
        this.total= operators[this.currOp](this.total,this.currNum);

        // console.log("totalA: ", this.total);
        // console.log("currNumA: ",this.currNum);
        display.innerText=this.total;
        this.currOp= op;
        
        if(op=='='){
          this.prev="eq";
        }else{
          this.prev="op";
        }
      }
      // console.log("op: ",this.currText);
    }
  },
  
  handleClick: function(e) {
    if (e.target !== e.currentTarget) {
      var operation = e.target.innerText;
      this.doOperation(operation);
    }
    e.stopPropagation();
  }
};