import {
  describe,
  expect,
  test,
} from 'vitest';
import { cleanURL, makeRecap } from './helpers';

describe('cleanURL', () => {
  test('output is correct', () => {
    expect(cleanURL('a/b/c/', 'd')).toBe('/a/b/c/d');
    expect(cleanURL('/a/b/c', 'd')).toBe('/a/b/c/d');
    expect(cleanURL('/a/b/c?x=y#z', 'd')).toBe('/a/b/c/d');
  });

  test('output contains only path', () => {
    expect(cleanURL('http://a/b/c/', 'd')).toBe('/b/c/d');
    expect(cleanURL('https://a/b/c/', 'd')).toBe('/b/c/d');
    expect(cleanURL('https://a/b/c', 'd')).toBe('/b/c/d');
  });
});

describe('makeRecap', () => {
  const data = { a: 'content a', b: 'content b', c: 'content c' };

  test('build expected content', () => {
    const expectation = 'content a\n---\ncontent b\n---\ncontent c';
    const result = makeRecap(data);

    expect(result).toBe(expectation);
  });

  test('build expected content', () => {
    const expectation = 'content a\n---\ncontent b';
    const fields = ['a', 'b', 'd'];
    const result = makeRecap(data, fields);

    expect(result).toBe(expectation);
  });

  test('build expected content', () => {
    const expectation = 'label a\ncontent a\n---\nlabel b\ncontent b\n---\nlabel d\n';
    const fields = [
      ['label a\n', 'a'],
      ['label b\n', 'b'],
      ['label d\n', 'd'],
    ];
    const result = makeRecap(data, fields);
    expect(result).toBe(expectation);
  });

  // test('build expected content', () => {
  //   const expectation = 'content a\n---\ncontent b';
  //   const fields = [
  //     'a',
  //     'b',
  //     'c',
  //   ];
  //   const result = makeRecap(data, fields);

  //   expect(result).toBe(expectation);
  // });
});
