const PASSWORD_REG_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;

const ERR_MSG = {
  REQUIRED: "This field is required.",
  EMAIL: "Invalid email address.",
  PASSWORD:
    "Password must be a combination of letters, numbers, and uppercase letters.",
  PASSWORD_NOT_MATCHED: "Password does not matched.",
};

export { ERR_MSG, PASSWORD_REG_PATTERN };
