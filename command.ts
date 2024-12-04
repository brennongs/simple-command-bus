import { Command } from './index.d'
import commands from '.';

export class ExampleCommand {
  constructor(
    public input: {
      say: string
    }
  ) {}
}

class ExampleCommandHandler implements Command {
  public async execute(command: ExampleCommand): Promise<string> {
    console.log(command.input.say)

    return command.input.say;
  }
}

commands.register(ExampleCommand, ExampleCommandHandler)