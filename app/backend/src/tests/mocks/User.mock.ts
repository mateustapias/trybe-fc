const mockFields = {
  id: 1,
  username: 'mockUsername',
  role: 'mockRole',
  email: 'mockEmail',
  password: 'mockPassword',
}

const { id, username, role, email, password } = mockFields;

const validUserBody = { email, password };

const validUserModelReturn = { ...mockFields };

export default { 
  validUserBody,
  validUserModelReturn,
}
