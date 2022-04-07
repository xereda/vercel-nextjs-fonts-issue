import { render, screen } from '@testing-library/react';
import InsideLoading from './InsideLoading';

describe('InsideLoading Component', () => {
  test('deve renderizar o loading caso a prop loading receba true', () => {
    render(<InsideLoading loading>hello world!</InsideLoading>);

    expect(screen.getByRole('Loading')).toBeInTheDocument();
  });

  test('deve renderizar o children node caso a prop loading receba false', () => {
    render(<InsideLoading loading={false}>hello world!</InsideLoading>);

    expect(screen.getByText(/hello world!/)).toBeInTheDocument();
  });
});
