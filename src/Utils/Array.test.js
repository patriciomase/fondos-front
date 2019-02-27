import { expect } from 'chai';
import { merge } from './Array';

const arr1 = [
  { id: 1, dateTime: '2018-1-1' },
  { id: 2, dateTime: '2018-1-2' },
  { id: 3, dateTime: '2018-1-3' },
];

const arr2 = [
  { name: 'one', dateTime: '2018-1-1' },
  { name: 'two', dateTime: '2018-1-2' },
  { name: 'four', dateTime: '2018-1-4'},
];

describe('Array function utilities', () => {
  const merged = merge(arr1, arr2);

  it('Merges two arrays by dateTime', () => {
    expect(merged).to.have.length(4);
    expect(merged[0].id).to.equal(1);
    expect(merged[0].name).to.equal('one');
    expect(merged[1].id).to.equal(2);
    expect(merged[1].name).to.equal('two');
    expect(merged[2].id).to.equal(3);
    expect(merged[2].name).to.equal(undefined);
    expect(merged[3].id).to.equal(undefined);
    expect(merged[3].name).to.equal('four');
  });
});
