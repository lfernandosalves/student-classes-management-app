import { Student } from '../../../src/domain/student'

describe('Student Domain', () => {
  describe('I want to verify a CPF, so', () => {
    it('should return false if cpf doesnt have the right length', () => {
      expect(Student.isCpfValid('123')).toBe(false)
      expect(Student.isCpfValid('1234567891011')).toBe(false)
    })

    it('should return false if it contains invalid characters', () => {
      expect(Student.isCpfValid('55412312aaa')).toBe(false)
      expect(Student.isCpfValid('_123431223123_')).toBe(false)
    })

    it('should return true for valid cpf', () => {
      expect(Student.isCpfValid('44122233211')).toBe(true)
      expect(Student.isCpfValid('442.883.222-11')).toBe(true)
    })
  })
})
