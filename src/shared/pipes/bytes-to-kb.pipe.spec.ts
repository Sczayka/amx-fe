import { BytesToKbPipe } from './bytes-to-kb.pipe';

describe('BytesToKbPipe', () => {
  it('create an instance', () => {
    const pipe = new BytesToKbPipe();
    expect(pipe).toBeTruthy();
  });
});
