import Cycle from 'cyclejs';
import Immutable from 'immutable';
import OfficesMap from './offices-map';
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

  let now$ = Rx.Observable.interval(500).startWith('!').map(() => moment());

  let floatProgress$ = now$.map(now => {
    let partialDuration = moment.duration(now.diff(movingStarts)).asMinutes();
    return Math.min(100, Math.max(0, (partialDuration / totalDuration) * 100));
  });

  let progress$ = floatProgress$.map(floatProgress => Math.floor(floatProgress));

  let timeLeft$ = Rx.Observable.interval(5).map(() => {
    let now = moment();
    let duration = moment.duration(movingEnds.diff(now));
    let daysLeft = duration.days();
    let hoursLeft = duration.hours();
    let minutesLeft = duration.minutes();
    let secondsLeft = duration.seconds();
    let msLeft = String(duration.milliseconds());
    while (msLeft.length < 3) {
      msLeft = `0${msLeft}`;
    }
    if (msLeft.length >= 4) {
      msLeft = '999';
    }
    return `${daysLeft > 0 ? daysLeft + ' days, ' : ''}
            ${hoursLeft > 0 ? hoursLeft + ' hours, ' : ''}
            ${minutesLeft > 0 ? minutesLeft + ' minutes, ' : ''}
            ${secondsLeft > 0 ? secondsLeft + ' seconds, ' : ''}
            ${msLeft > 0 ? msLeft + ' milliseconds' : ''}
            `;
  });
  return {progress$, floatProgress$, timeLeft$};
});

let view = Cycle.createView(model => {
  let textStyle = {
    fontFamily: 'Open Sans',
    fontWeight: '800',
    color: '#58B957'
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

  function renderTimeLeft(timeLeft) {
    return h('.row', [
      h('.col-md-12', [
        h('.text-center', {style: textStyle}, `Just ${timeLeft} to go`)
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
      model.get('timeLeft$'),
      (progress, floatProgress, timeLeft) =>
        h('div', [
          new OfficesMap(floatProgress / 100.0),
          h('div', {style: progressBoxContainerStyle}, [
            h('div', {style: progressBoxStyle}, [
              renderHeader(progress),
              renderProgressBar(progress, floatProgress),
              progress < 100 ? renderTimeLeft(timeLeft) : null
            ])
          ])
        ])
    )
  };
});

var user = Cycle.createDOMUser('.js-app');

user.inject(view).inject(model);
