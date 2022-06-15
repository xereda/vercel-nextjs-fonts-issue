import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Layout component', () => {
  test('should render title', () => {
    render(<Title />);
    expect(screen.queryByText('Title')).toBeInTheDocument();
  });
});
