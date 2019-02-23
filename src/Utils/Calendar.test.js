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
    const aMonth = lastMonth(2020, 3, 8);
    expect(aMonth).to.have.length(30);
    expect(aMonth[0].name).to.equal('2020-3-8');
    expect(aMonth[1].name).to.equal('2020-3-7');
    expect(aMonth[8].name).to.equal('2020-2-29');
    expect(aMonth[29].name).to.equal('2020-2-8');
  });

  it('Returns an array correctly managing the going back to past year', () => {
    const aMonth = lastMonth(2020, 1, 8);
    expect(aMonth).to.have.length(30);
    expect(aMonth[0].name).to.equal('2020-1-8');
    expect(aMonth[29].name).to.equal('2019-12-10');
  });

  it('Returns an array including all the last 3 months days', () => {
    const days = last3Months(2020, 3, 8);
    expect(days).to.have.length(90);
    expect(days[0].name).to.equal('2020-3-8');
    expect(days[1].name).to.equal('2020-3-7');
    expect(days[8].name).to.equal('2020-2-29');
    expect(days[29].name).to.equal('2020-2-8');
    expect(days[37].name).to.equal('2020-1-31');
    expect(days[68].name).to.equal('2019-12-31');
    expect(days[89].name).to.equal('2019-12-10');
  });
});
