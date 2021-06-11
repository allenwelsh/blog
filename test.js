// function myApply(fn, context, ...arg) {
//   if (context === null) {
//     context = window;
//   } else {
//     context = Object(context);
//   }

//   const a = new Symbol("weiyi");

//   context[a] = fn;

//   const result = context[a](arg);

//   result.proto = context.protoType;

//   delete context[a];

//   return result;
// }

// myApply(Object.prototype.toString, []);

// Function.prototype.myApply = function(){

// }

function Father(a) {
  this.a = a;
}
Father.prototype.show = function () {
  console.log(this.a);
};

function Son(a) {
  //   var result = Object.create(Father.prototype);

  //   Father.apply(result, []);
  //   return result;
  Father.call(this, a);
}

Son.prototype = Object.create(Father.prototype);

Son.prototype.constructor = Son;

let s = new Son("r");
