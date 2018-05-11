const numberNames = require('./index')

describe('number names', () => {
  ;[
    { in: 0, out: 'zero' },
    { in: 1, out: 'one' },
    { in: 5, out: 'five' },
    { in: 9, out: 'nine' },
    { in: 10, out: 'ten' },
    { in: 11, out: 'eleven' },
    { in: 16, out: 'sixteen' },
    { in: 22, out: 'twenty two' },
    { in: 68, out: 'sixty eight' },
    { in: 100, out: 'one hundred' },
    { in: 101, out: 'one hundred and one' },
    { in: 121, out: 'one hundred and twenty one' },
    { in: 1000, out: 'one thousand' },
    { in: 5678, out: 'five thousand, six hundred and seventy eight' },
    { in: 654321, out: 'six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 7654321, out: 'seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 87654321, out: 'eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 987654321, out: 'nine hundred and eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 1987654321, out: 'one billion, nine hundred and eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 12987654321, out: 'twelve billion, nine hundred and eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: 123987654321, out: 'one hundred and twenty three billion, nine hundred and eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: -987654321, out: 'negative nine hundred and eighty seven million, six hundred and fifty four thousand, three hundred and twenty one' },
    { in: -98765, out: 'negative ninety eight thousand, seven hundred and sixty five' },
    { in: -987, out: 'negative nine hundred and eighty seven' },
    { in: -98, out: 'negative ninety eight' },
    { in: -9, out: 'negative nine' },
  ].forEach(testData => {
    it(`outputs "${testData.out}" when input is ${testData.in}`, () => {
      expect(numberNames(testData.in)).toEqual(testData.out)
    })
  })
})
