console.log(
  '### process.env.NEXT_PUBLIC_ENVIRONMENT ###: ',
  process.env.NEXT_PUBLIC_ENVIRONMENT,
);

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
