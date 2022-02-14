import { render, screen } from '@testing-library/react';
import Layout from './Layout';

const ContentComponet = () => <div>hello</div>;

beforeEach(() => {
  render(
    <Layout>
      <ContentComponet />
    </Layout>,
  );
});

describe('Layout component', () => {
  test('deve renderizar o Layout com o Navbar', () => {
    expect(screen.queryByText('Pedidos')).toBeInTheDocument();
  });

  test('deve renderizar o componente passado como children', () => {
    expect(screen.queryByText('hello')).toBeInTheDocument();
  });
});
