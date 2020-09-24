 const userData = {
    authResponse: {
      status: true,
      message: 'You have successfully signed up',
      data: {
          id: 1,
          username: 'johndoe',
          fullName: 'John Doe',
          token: "JohnDoeToken",
          isAdmin: true
      }
    },
     signupData: {
      username: 'johndoe',
      name: 'John Doe',
      email: "johndoe@me.co",
      password: 'johndoe1234',
      isAdmin: true
    },
    loginData: {
        email: "johndoe@me.co",
        password: "johndoe1234",
    }
  }
  export default userData;