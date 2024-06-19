export const registerValidator = {
  fullname: {
    isLength: {
      options: {
        //make sure if you add isLength write options right
        min: 3,
      },
      errorMessage: "name must be at least 3 characters",
    },
    notEmpty: {
      errorMessage: "name is required",
    },
    isString: {
      errorMessage: "name must be a stringess",
    },
  },
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
  confirmpassword: {
    notEmpty: {
      errorMessage: "confirm password is required",
    },
  },
};
