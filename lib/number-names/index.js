const ones = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const teens = [
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
]
const tens = [
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
]
const units = ['thousand', 'million', 'billion', 'trillion']
const radix = 10

// Convert the number into groups of 3 (algorithm 2 - three digit rule)
const getThreeDigitGroups = number =>
  number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)

// Incorporate hundreds rule on number (algorithm 3 - hundreds rule)
const hundredsRule = number => {
  const numberUnits = number.toString().split('')

  if (numberUnits && (numberUnits.length < 3 || numberUnits[0] === '0')) {
    return ''
  } else if (parseInt(number, radix) % 100 === 0) {
    return `${ones[parseInt(numberUnits[0], radix) - 1]} hundred`
  } else if (parseInt(number, radix) % 100 !== 0) {
    return `${ones[parseInt(numberUnits[0], radix) - 1]} hundred and`
  }

  return ''
}

// Incorporate tens rule on number (algorithm 4 - tens rule)
const tensRule = number => {
  const numberUnits = number.toString().split('')

  while (numberUnits.length < 2) {
    numberUnits.unshift('0')
  }

  if (numberUnits[1] === '0' && numberUnits[2] === '0') {
    return ''
  }

  const tensDigit = parseInt(numberUnits[numberUnits.length - 2], radix)
  const tensNumber = parseInt(`${numberUnits[numberUnits.length - 2]}${numberUnits[numberUnits.length - 1]}`, 10)

  if (tensDigit >= 2) {
    const thirdDigit = parseInt(numberUnits[numberUnits.length - 1], radix) !== 0 ? ones[parseInt(numberUnits[numberUnits.length - 1], radix) - 1] : ''
    return `${tens[parseInt(numberUnits[numberUnits.length - 2], radix) - 1]} ${thirdDigit}`;
  } else if (tensNumber > 0 && tensNumber < 10) {
    return `${ones[tensNumber - 1]}`
  } else if (tensNumber > 10) {
    return `${teens[tensNumber - 11]}`
  } else if (tensNumber === 10) {
    return 'ten'
  }

  return ''
}

// Cleanup string of redundant spaces, and commas
const trim = str =>
  str.replace(/ {2}/g, ' ').replace(/^\s+|\s+$/g, '').replace(/(,$)/g, '')

module.exports = number => {
  let outputBuilder = ''

  if (number === 0) {
    return 'zero' // algorithm 1 - zero rule
  } else if (number < 0) {
    outputBuilder = 'negative' // algorithm 2 - negative rule
  }

  const groups = getThreeDigitGroups(number)

  // algorithm 5 - recombination
  groups.forEach((item, index) => {
    const trailingComma = index === groups.length - 1 ? '' : ','
    const scaleNumber = units[groups.length - index - 2] || ''
    outputBuilder = `${outputBuilder} ${hundredsRule(item)} ${tensRule(item)} ${scaleNumber}${trailingComma}`
  })

  return trim(outputBuilder)
}
