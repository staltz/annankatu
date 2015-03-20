import Cycle from 'cyclejs';
import moment from 'moment';
import Immutable from 'immutable';
import OfficesMap from './offices-map';
import './time-counter';
let Rx = Cycle.Rx;
let h = Cycle.h;

function mergeStyles(...styleObjects) {
  let isTruthy = (x => !!x);
  return styleObjects.filter(isTruthy).reduce((styleA, styleB) => {
    let mapA = Immutable.Map(styleA);
    let mapB = Immutable.Map(styleB);
    return mapA.merge(mapB).toObject(); // notice B first
  }, {});
}

let model = Cycle.createModel(() => {
  let movingStarts = moment('2015-03-18 13:00');
  let movingEnds = moment('2015-03-23 08:00');
  let totalDuration = moment.duration(movingEnds.diff(movingStarts)).asMinutes();

  let now$ = Rx.Observable.interval(1000).startWith(0).map(() => moment());

  let floatProgress$ = now$.map(now => {
    let partialDuration = moment.duration(now.diff(movingStarts)).asMinutes();
    return Math.min(100, Math.max(0, (partialDuration / totalDuration) * 100));
  });

  let progress$ = floatProgress$.map(floatProgress => Math.floor(floatProgress));

  return {
    progress$,
    floatProgress$,
    movingEnds$: Rx.Observable.just(movingEnds)
  };
});

let view = Cycle.createView(model => {
  let textStyle = {
    fontFamily: 'Open Sans',
    fontWeight: '800',
    color: '#389E48'
  };

  function renderHeader(progress) {
    return h('.row', [
      h('.col-md-4', [
        h('h3.text-left', {
          style: mergeStyles(
            textStyle, {
            margin: '10px 0'})},
          'Vattuniemenranta 2')
      ]),
      h('.col-md-4', [
        h('h1.text-center', {
          style: mergeStyles(
            textStyle, {
            margin: '0 0 10px'})}, 
          `${progress}% there`)
      ]),
      h('.col-md-4', [
        h('h3.text-right', {
          style: mergeStyles(
            textStyle, {
            margin: '10px 0'})},
          'Annankatu 34B')
      ])
    ]);
  }

  function renderProgressBar(progress, floatProgress) {
    return h('.row', [
      h('.col-md-12', [
        h('.progress', [
          h('.progress-bar.progress-bar-success.progress-bar-striped.active', {
            attributes: {
              role: 'progressbar',
              'aria-valuenow': String(progress),
              'aria-valuemin': '0',
              'aria-valuemax': '100',
            },
            style: {
              width: `${floatProgress}%`
            }},
            h('span.sr-only', `${progress}% Complete`)
          )
        ])
      ])
    ]);
  }

  let progressBoxContainerStyle = {
    width: '100vw',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  let progressBoxStyle = {
    width: '90%',
    position: 'relative',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 10px 40px 0 rgba(0,0,0,0.75)',
    backgroundColor: 'white'
  };

  return {
    vtree$: Rx.Observable.combineLatest(
      model.get('progress$'),
      model.get('floatProgress$'),
      model.get('movingEnds$'),
      (progress, floatProgress, movingEnds) =>
        h('div', [
          new OfficesMap(floatProgress / 100.0),
          h('div', {style: progressBoxContainerStyle}, [
            h('div', {style: progressBoxStyle}, [
              renderHeader(progress),
              renderProgressBar(progress, floatProgress),
              progress < 100 ? h('time-counter', {textStyle, movingEnds}) : null
            ])
          ])
        ])
    )
  };
});

var user = Cycle.createDOMUser('.js-app');

user.inject(view).inject(model);
