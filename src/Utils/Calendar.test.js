import { expect } from 'chai';
import { lastMonth, last3Months, prevMonth, prevYear, daysInMonth } from './Calendar';

describe('Calendar functions', () => {
  it('Returns the previous month', () => {
    expect(prevMonth(1)).to.equal(12);
    expect(prevMonth(3)).to.equal(2);
    expect(prevMonth(7)).to.equal(6);
    expect(prevMonth(12)).to.equal(11);
  });

  it('Returns the right amount of days of each month by month and year', () => {
    expect(daysInMonth(2018, 2)).to.equal(28);
    expect(daysInMonth(2018, 12)).to.equal(31);
    expect(daysInMonth(2018, 1)).to.equal(31);
    expect(daysInMonth(2018, 11)).to.equal(30);
    expect(daysInMonth(2020, 2)).to.equal(29);
  });

  it('Returns the previous year number', () => {
    expect(prevYear(2018)).to.equal(2017);
  });

  it('Returns an array including all the last month days', () => {
    const aMonth = lastMonth(2020, 4, 8);
    expect(aMonth[0]).to.equal('2020-03-09');
    expect(aMonth[1]).to.equal('2020-03-10');
    expect(aMonth[8]).to.equal('2020-03-17');
    expect(aMonth[29]).to.equal('2020-04-07');
  });

  it('Returns an array correctly managing the going back to past year', () => {
    const aMonth = lastMonth(2020, 1, 8);
    expect(aMonth[0]).to.equal('2019-12-09');
    expect(aMonth[29]).to.equal('2020-01-07');
  });

  it('Returns an array including all the last 3 months days', () => {
    const days = last3Months(2020, 3, 8);
    expect(days[0]).to.equal('2019-12-09');
    expect(days[1]).to.equal('2019-12-10');
    expect(days[8]).to.equal('2019-12-17');
    expect(days[29]).to.equal('2020-01-07');
    expect(days[37]).to.equal('2020-01-15');
    expect(days[68]).to.equal('2020-02-15');
    expect(days[89]).to.equal('2020-03-07');
  });
});
