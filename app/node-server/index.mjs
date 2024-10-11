/** @format */

async function async1() {
  await async2();
  console.log(0);
}

function async2() {
  return new Promise((resolve) => {
    resolve();
  });
}

async function test() {
  await new Promise((resolve) => {
    resolve();
  });
  console.log(1);
}
test();
async1();
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3))
  .then(() => console.log(4))
  .then(() => console.log(5));
console.log("原始");
