 export const loginValidator = {
  email: {
    notEmpty: {
      errorMessage: "email is required",
    },
    isEmail: {
      errorMessage: "your email must be valid",
    },
  },
  password: {
    isLength: {
      options: {
        //make sure if you add isLength write options right
        min: 8,
        max: 250,
      },
      errorMessage: "password must be at least 8 characters",
    },
    notEmpty: {
      errorMessage: "password is required",
    },
  },
}