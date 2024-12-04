import { ExampleCommand } from './command';
import commands from '.';


(async function main() {
  await commands.execute(
    new ExampleCommand({
      say: 'hello world' 
    })
  )
})()