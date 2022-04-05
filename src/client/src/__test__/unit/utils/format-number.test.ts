import { formatRentValue } from '../../../utils/format-number'

test('format number', async () => {
  const formNum1 = formatRentValue('1000')
  expect(formNum1).toEqual('1,000')

  const formNum2 = formatRentValue('250250250')
  expect(formNum2).toEqual('250,250,250')

  const formNum3 = formatRentValue('01')
  expect(formNum3).toEqual('1')
})
