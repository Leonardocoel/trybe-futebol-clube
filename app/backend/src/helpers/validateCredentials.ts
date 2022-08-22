const validateCredentials = (email: string, password: string): void => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.name = 'BAD_REQUEST';
    throw error;
  }
};

export default validateCredentials;
