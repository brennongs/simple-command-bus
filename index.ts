// import { randomUUID } from "crypto"
import { Command } from "./index.d";

function generateId() {
  return (Math.random() * 100000000).toString();
}

const METADATA = '__metadata__'
const REGISTRY = Symbol.for('COMMANDS');
const INSTANCE = Symbol.for('INSTANCE');

class CommandBus {
  private [REGISTRY]: Record<any, Command> = {}
  private static [INSTANCE]: CommandBus;

  private constructor() {}

  public static get instance() {
    if (!this[INSTANCE]) {
      this[INSTANCE] = new this()
    }

    return this[INSTANCE]
  }

  public register(command: any, handler: any) {
    const id = generateId();
    Reflect.set(command, METADATA, {
      id
    })

    this[REGISTRY][id] = Reflect.construct(handler, [])
  }

  public async execute(command: any): Promise<any> {
    const { constructor } = Object.getPrototypeOf(command)
    const { id } = Reflect.get(constructor, METADATA)

    return this[REGISTRY][id].execute(command);
  }
}

export default CommandBus.instance