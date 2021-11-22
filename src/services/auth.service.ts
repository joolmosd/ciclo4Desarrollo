/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {config} from '../config/config';
import {User} from '../models';
import {UserRepository} from '../repositories';
const jwt = require('jsonwebtoken');
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");

export type Auth = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository) { }

  GenerarClave() {
    const clave = generator(8, false);
    return clave;
  }

  CifrarClave(clave: String) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //JWT
  GenerarTokenJWT(user: User) {
    const token = jwt.sign({
      data: {
        id: user.id,
        email: user.email,
        names: user.names + " " + user.lastNames
      }
    }, config.claveJWT)

    return token
  }

  validarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, config.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }

  //Autenticacion
  IdentificarPersona(email: string, password: string) {
    try {
      const p = this.userRepository.findOne({where: {email: email, password: password}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }



}
