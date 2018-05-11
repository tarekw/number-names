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

// Apply hundreds rule on number (algorithm 3 - hundreds rule)
const hundredsRule = number => {
  const numberUnits = number.toString().split('')
  const index = parseInt(numberUnits[0], radix) - 1

  if (index >= 0 && numberUnits.length === 3 && number !== '000' && parseInt(number, radix) % 100 === 0) {
    return `${ones[index]} hundred`
  } else if (index >= 0 && numberUnits.length === 3 && parseInt(number, radix) % 100 !== 0) {
    return `${ones[index]} hundred and`
  }

  return ''
}

// Apply tens rule on number (algorithm 4 - tens rule)
const tensRule = number => {
  const numberUnits = number.toString().split('')

  while (numberUnits.length < 2) {
    numberUnits.unshift('0')
  }

  if (numberUnits[1] === '0' && numberUnits[2] === '0') {
    return ''
  }

  const tensDigit = parseInt(numberUnits[numberUnits.length - 2], radix)
  const tensNumber = parseInt(`${numberUnits[numberUnits.length - 2]}${numberUnits[numberUnits.length - 1]}`, radix)

  if (tensDigit >= 2) {
    const thirdDigit = parseInt(numberUnits[numberUnits.length - 1], radix) !== 0 ? ones[parseInt(numberUnits[numberUnits.length - 1], radix) - 1] : ''
    return `${tens[tensDigit - 1]} ${thirdDigit}`;
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
  str.replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '').replace(/,{1,}$/, '')

module.exports = number => {
  let comma, commaText, scale, scaleText, hundredsText = tensText = outputText =''

  if (number === 0) {
    return 'zero' // algorithm 1 - zero rule
  } else if (number < 0) {
    outputText = 'negative' // algorithm 2 - negative rule
  }

  const groups = getThreeDigitGroups(Math.abs(number))

  // algorithm 5 - recombination
  groups.forEach((item, index) => {
    hundredsText = hundredsRule(item)
    tensText = tensRule(item)
    comma = index === groups.length - 1 ? '' : ','
    commaText = (hundredsText !== '' || tensText !== '') ? comma : ''
    scale = units[groups.length - index - 2] || ''
    scaleText = (hundredsText !== '' || tensText !== '') ? scale : ''

    // handle special case when final group does not include any hundreds and there is more than one non-blank group
    if (index === groups.length - 1 && hundredsText === '' && tensText !== '') {
      outputText = outputText.replace(/^\s+|\s+$/g, '').replace(/,{1,}$/g, ' and')
    }

    outputText = `${outputText} ${hundredsText} ${tensText} ${scaleText}${commaText}`
  })

  return trim(outputText)
}
