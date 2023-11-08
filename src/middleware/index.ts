import { verify } from "./authentication.middleware";
import errorHandler from "./error.middleware";
import checkAuthor from "./authoriztion.middleware";
import { validatorRegister, validatorLogin } from "./validator.middleware";
export { verify,errorHandler, checkAuthor, validatorRegister, validatorLogin};
