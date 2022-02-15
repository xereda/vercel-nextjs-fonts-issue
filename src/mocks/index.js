if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    const { server } = require('./server');

    server.listen();
  } else {
    const { worker } = require('./browser');

    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
