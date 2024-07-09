const checkPasswordValidity = (passWord: string): string[] => {
  // const validatePasssword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const errors: string[] = [];

  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(passWord)) {
    errors.push("Password must not contain spaces.");
  }

  const isContainsUpperCase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUpperCase.test(passWord)) {
    errors.push("Password requires at least one uppercase letter.");
  }

  const isContainsLowerCase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowerCase.test(passWord)) {
    errors.push("Password requires at least one lowercase letter.");
  }

  const isContainsDigit = /^(?=.*\d).*$/;
  if (!isContainsDigit.test(passWord)) {
    errors.push("Password requires at least one digit.");
  }

  const isContainsSpecialCharacter = /^(?=.*[\W_]).*$/;
  if (!isContainsSpecialCharacter.test(passWord)) {
    errors.push("Password requires at least one special character.");
  }

  const isValidLength = /^.{8,16}$/;
  if (!isValidLength.test(passWord)) {
    errors.push("Password must be 8-16 Characters Long.");
  }

  return errors;
};

export default checkPasswordValidity;
