import { stringAvatar } from '../../../utils/avatar-initials'

test('string initials', async () => {
  const avaInitials1 = stringAvatar('Walter White')
  expect(avaInitials1).toEqual('WW')

  const avaInitials2 = stringAvatar('Walter')
  expect(avaInitials2).toEqual('W')

  const avaInitials3 = stringAvatar('Jesse Pinkman')
  expect(avaInitials3).toEqual('JP')
})
