import * as fs from 'fs';
import * as path from 'path';

export default class Secret {
  static reader() {
    const secret = fs.readFileSync(
      path.resolve(__dirname, '../../jwt.evaluation.key'),
      'utf-8',
    );
    return secret;
  }
}
