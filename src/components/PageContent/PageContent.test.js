import { render, screen, within } from '@testing-library/react';
import PageContent from './PageContent';

const Component = () => <div>hello world!</div>;

describe('PageContent Component', () => {
  test('deve renderizar o componente e o pagina informada como children', () => {
    render(
      <PageContent title="teste">
        <Component />
      </PageContent>);

    expect(screen.getByText('hello world!')).toBeInTheDocument();
  });

  test.only('deve renderizar COM o botao de voltar', () => {
    const { getByRole } = render(
      <PageContent title="teste" onBack={() => null}>
        <Component />
      </PageContent>);

    const button = getByRole('button', { name: 'Back' });
    expect(within(button).getByRole('img', { name: 'arrow-left' })).toBeInTheDocument();
  });

  test('deve renderizar SEM o botão voltar', () => {
    render(
      <PageContent title="teste">
        <Component />
      </PageContent>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

'ant-page-header-back-button';