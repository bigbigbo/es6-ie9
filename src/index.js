function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./es6', true, /\.js$/));
