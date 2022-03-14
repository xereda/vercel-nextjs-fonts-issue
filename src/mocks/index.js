console.log('### process.env ###: ', process.env.NEXT_PUBLIC_ENVIRONMENT);

if (
  process.env.NODE_ENV === 'development' &&
  !process.env.NEXT_PUBLIC_ENVIRONMENT
) {
  if (typeof window === 'undefined') {
    const { server } = require('./server');

    server.listen();
  } else {
    const { worker } = require('./browser');
    console.log('vai habilitar o MSW');

    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
