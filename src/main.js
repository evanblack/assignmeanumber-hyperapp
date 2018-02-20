import { h, app } from 'hyperapp';
import state from './state';
import createActions from './actions';
import logoUrl from './assets/logo.svg';

const actions = createActions(state)

const view = (state, actions) => {
  const unassigned = state.numbers.filter(n => n.assigned === false);
  const done = !unassigned.length
  return (
    <div className={ `spa-scroll ${ state.screen }` }>
      <section className="spa-page">
        <div className="spa-page-wrapper">
          <img className="logo" src={ logoUrl } alt="assignmeanumber" />
          <div className="hello">
            <h1>Welcome!</h1>
            <p>How many numbers <br/>would you like to assign?</p>
          </div>
          <div className="range">
            <span className="start">1</span>
            <span className="hyphen">&ndash;</span>
            <input className="end"
              autofocus autocomplete="off"
              type="number"
              value={ state.howManyNumbers }
              onchange={ (e) => actions.setHowManyNumbers(e.target.value) } />
          </div>
          <button className="button button-ready" onclick={ () => actions.ready() }>Ready!</button>
        </div>
      </section>
      <section className="spa-page">
        <div className="spa-page-wrapper">
          <button className="button button-startOver" onclick={ () => actions.startOver() }>Start Over?</button>
          <div className="picker">
            <div className={ `card ${ state.cardFlipped ? 'flipped' : '' }` }>
              <div className="face front" onclick={ () => actions.getNewNumber() }>
                { state.pointer || !done ?
                  <span className="next">Get the next number!</span>
                :
                  <span className="done">That's it!</span>
                }
              </div>
              <div className="face back" onclick={ () => actions.flipCard() }>
                { state.pointer ?
                  <span className="number">{ state.pointer.value }</span>
                :
                  <span className="done">That's it!</span>
                }
              </div>
            </div>
            <span className="numbers-left">Numbers left: { unassigned.length }</span>
          </div>
        </div>
      </section>
    </div>
  )
}

window.app = app(state, actions, view, document.getElementById('app'))
