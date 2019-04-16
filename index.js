const _ = Symbol("parameter");
const ___ = Symbol("rest parameters");

const reduce = function(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const item of iter) {
    acc = f(acc, item);
  }
  return acc;
};

// const map = function(f, iter) {
//   const res = [];
//   for (const item of iter) {
//     res.push(f(item));
//   }
//   return res;
// };

const map = (f, iter) => reduce((acc, i) => (acc.push(f(i)), acc), [], iter);

// const filter = function(f, iter) {
//   const res = [];
//   for (const item of iter) {
//     if (f(item)) res.push(item);
//   }
//   return res;
// };

const filter = (f, iter) =>
  reduce((acc, i) => (f(i) && acc.push(i), acc), [], iter);

// const groupBy = function(f, iter) {
//   const res = {};
//   for (const i of iter) {
//     if (res[f(i)]) {
//       res[f(i)].push(i);
//     } else res[f(i)] = [i];
//   }
//   return res;
// };

const groupBy = (f, iter) =>
  reduce(
    (res, i) => (res[f(i)] ? res[f(i)].push(i) : (res[f(i)] = [i]), res),
    {},
    iter
  );

// const countBy = function(f, iter) {
//   const res = {};
//   for (const i of iter) {
//     if (res[f(i)]) {
//       res[f(i)] += 1;
//     } else {
//       res[f(i)] = 1;
//     }
//   }
//   return res;
// };

const countBy = (f, iter) =>
  reduce(
    (res, i) => (res[f(i)] ? res[f(i)]++ : (res[f(i)] = 1), res),
    {},
    iter
  );

// const indexBy = function(f, iter) {
//   const res = {};
//   for (const i of iter) {
//     res[f(i)] = i;
//   }
//   return res;
// };

const indexBy = (f, iter) =>
  reduce((res, i) => ((res[f(i)] = i), res), {}, iter);

// const pipe = function(...fs) {
//   return function(...acc) {
//     let init = fs[0](...acc);
//     for (let i = 1; i < fs.length; i++) {
//       init = fs[i](init);
//     }
//     return init;
//   };
// };

// const pipe = (f1, ...fs) => (...acc) =>
//   reduce((acc, f) => f(acc), f1(...acc), fs);

// const go = function(...args) {
//   let a = args[0];
//   for (let i = 1; i < args.length; i++) {
//     a = args[i](a);
//   }
//   return a;
// };

const go = (...args) => reduce((acc, f) => f(acc), args);

const pipe = (f1, ...fs) => (...acc) => go(f1(...acc), ...fs);

const curry = function() {};

const partial = function() {};

export {
  map,
  filter,
  reduce,
  groupBy,
  countBy,
  indexBy,
  pipe,
  go,
  curry,
  partial,
  _,
  ___
};
