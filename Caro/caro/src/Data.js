export const chesses = [];
for (let i = 0; i < 400; i++) {
  chesses.push({
    index: i,
    j: (i % 20) + 1,
    i: ~~(i / 20) + 1,
    type: 0,
  });
}
