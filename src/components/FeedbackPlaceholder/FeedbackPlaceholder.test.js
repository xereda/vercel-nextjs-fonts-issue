import { render, screen } from '@testing-library/react';
import FeedbackPlaceholder from './FeedbackPlaceholder';

const Component = () => <div>hello world!</div>;

describe('FeedbackPlaceholder component', () => {
  test('deve renderizar o componente informado como children', () => {
    render(
      <FeedbackPlaceholder>
        <Component />
      </FeedbackPlaceholder>,
    );

    expect(screen.getByText('hello world!')).toBeInTheDocument();
  });

  test('deve renderizar a dinamica de loadind independente do estado das demais props', () => {
    render(
      <FeedbackPlaceholder isLoading hasError noData>
        <Component />
      </FeedbackPlaceholder>,
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  test('deve renderizar o componente de erro', () => {
    render(
      <FeedbackPlaceholder isLoading={false} hasError={true}>
        <Component />
      </FeedbackPlaceholder>,
    );

    expect(screen.getByText('error')).toBeInTheDocument();
  });

  test('deve renderizar o componente relativo ao nao retorno de dados da integracao', () => {
    render(
      <FeedbackPlaceholder isLoading={false} hasError={false} noData={true}>
        <Component />
      </FeedbackPlaceholder>,
    );

    expect(screen.getByText('no data')).toBeInTheDocument();
  });
});