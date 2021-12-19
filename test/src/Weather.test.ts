import * as W from '../../src/Weather';

Date.now = () => 1609459200000;
W.init();

it('calculates weathers correctly', () => {
  expect(W.state.weathers).toMatchSnapshot();
});

it('finds list correctly', () => {
  expect(W.find({
    zone: 'Limsa Lominsa',
    hourMask: { 0: true, 8: true, 16: true },
  }).map(m => m())).toMatchSnapshot();
});

it('finds condition correctly', () => {
  expect(W.find({
    zone: 'Limsa Lominsa',
    desiredWeathers: [0, 3],
    previousWeathers: [4],
    beginHour: 7,
    endHour: 14,
  }).map(m => m())).toMatchSnapshot();
});
