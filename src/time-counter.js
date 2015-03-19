import Cycle from 'cyclejs';
import moment from 'moment';
let Rx = Cycle.Rx;
let h = Cycle.h;

Cycle.registerCustomElement('time-counter', (user, properties) => {
  let model = Cycle.createModel((properties) =>
    ({
      textStyle$: properties.get('textStyle$'),
      timeLeft$: Rx.Observable.interval(40).startWith(0).withLatestFrom(
        properties.get('movingEnds$'),
        (_, movingEnds) => {
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
        })
    })
  );

  let view = Cycle.createView((model) => 
    ({
      vtree$: Rx.Observable.combineLatest(
        model.get('timeLeft$'),
        model.get('textStyle$'),
        (timeLeft, textStyle) =>
          h('.row', [
            h('.col-md-12', [
              h('.text-center', {style: textStyle}, `Just ${timeLeft} to go`)
            ])
          ])
      )
    })
  );

  user.inject(view).inject(model).inject(properties);

  return {};
});

module.exports = {};
