const validateInput = require('../journeybuilder/utils/validateInput')

test('Input valid return back with true', () => {
  expect(validateInput.checkLength('covid-19')).toEqual({ status: true })
})
