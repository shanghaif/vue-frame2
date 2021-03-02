/**
 * @desc ts 测试示例
 */
import * as _ from 'lodash'; // https://www.typescriptlang.org/dt/search?search=lodash

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return _.join(['hello', this.greeting], '-');
  }
}

/* const greeter = new Greeter('world');

const button = document.createElement('button');
button.textContent = 'Say Hello';
button.click = function () {
  alert(greeter.greet());
};

document.body.appendChild(button); */
export default Greeter;
