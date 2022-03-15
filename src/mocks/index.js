if (
  process.env.NODE_ENV === 'development' &&
  !process.env.NEXT_PUBLIC_ENVIRONMENT
) {
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
