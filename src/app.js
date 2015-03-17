import Cycle from 'cyclejs';
let Rx = Cycle.Rx;
let h = Cycle.h;

function mergeStyles(...styleObjects) {
  return styleObjects.reduce((acc, curr) => jQuery.extend(acc, curr), {});
}

let model = Cycle.createModel(() => {
  let movingStarts = moment('2015-03-18 13:00');
  let movingEnds = moment('2015-03-23 08:00');
  let totalDuration = moment.duration(movingEnds.diff(movingStarts)).asMinutes();
  let now$ = Rx.Observable.interval(1000).map(() => moment());
  let progress$ = now$.map(now => {
    let partialDuration = moment.duration(now.diff(movingStarts)).asMinutes();
    return Math.round(
      Math.min(100, Math.max(0, (partialDuration / totalDuration) * 100))
    );
  })
  return {progress$};
});

let view = Cycle.createView(model => {
  function renderHeader(progress) {
    let textStyle = {
      fontFamily: 'Open Sans',
      fontWeight: '800',
      color: '#58B957'
    };

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

  function renderProgressBar(progress) {
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
              width: `${progress}%`
            }},
            h('span.sr-only', `${progress}% Complete`)
          )
        ])
      ])
    ]);
  }

  return {
    vtree$: model.get('progress$').map(progress =>
      h('div', {
        style: {
          width: '100vw',
          height: '100vh',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center'}}, [
        h('div', {style: {width: '90%'}}, [
          renderHeader(progress),
          renderProgressBar(progress)
        ])
      ])
    )
  };
});

var user = Cycle.createDOMUser('.js-app');

user.inject(view).inject(model);
