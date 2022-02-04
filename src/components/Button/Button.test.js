import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('deve renderizar um botao com o label informado como children', () => {
    render(<Button>Label</Button>);

    expect(screen.queryByText('Label')).toBeInTheDocument();
  });
});
