import { randomUUID } from 'crypto'

function randomNumber (min = 0, max = 50000): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateMockName (): string {
  return `Mock Name ${randomNumber()}`
}

export function generateMockEmail (): string {
  return `mock_mail_${randomNumber()}@test.com`
}

export function generateMockUuid (): string {
  return randomUUID()
}
