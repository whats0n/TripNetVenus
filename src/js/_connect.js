export default (() => {

  const events = {};

  const subscribe = (eventName, fn) => {
    if (!events[eventName]) events[eventName] = [];
    events[eventName].push(fn);
    return fn;
  };

  const unsubscribe = (eventName, fn) => {
    if (events[eventName] && !events[eventName].length) return;
    events[eventName] = events[eventName].filter(callback => callback !== fn);
  };

  const fire = (eventName, props) => {
    if (events[eventName] && events[eventName].length) events[eventName].forEach(fn => fn(props));
  };

  return {
    subscribe,
    unsubscribe,
    fire
  };

})();
