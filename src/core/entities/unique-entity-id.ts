import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  public toString() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
