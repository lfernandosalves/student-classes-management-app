import { Class } from './class'

export class Student {
  id: string
  name: string
  cpf: string
  email?: string
  classes: Class[]

  static isCpfValid (cpf: string): boolean {
    return true
  }
}
