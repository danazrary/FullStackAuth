import bcrypt from "bcrypt";

const solt = bcrypt.genSaltSync(10); 

export function hashPassword(password) {
  //for register
  
  return bcrypt.hashSync(password, solt); 
}

export function comparePassword(password, hash) {
  //for login
  return bcrypt.compareSync(password, hash);
}
