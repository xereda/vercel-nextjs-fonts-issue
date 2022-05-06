import { render, renderHook, screen } from '@testing-library/react';
import { useState } from '@hookstate/core';
import { loadingStore } from '@/store/index';
import Loading from './Loading';

const setLoading = (isLoading) =>
  renderHook(() => {
    const loading = useState(loadingStore);
    loading.set(isLoading);
  });

beforeAll(() => setLoading(true));

describe('Loading Component', () => {
  test('deve renderizar o loading quando o estado global loading seja verdadeiro', () => {
    render(<Loading />);

    expect(screen.getByRole('Loading')).toBeInTheDocument();
  });

  test('deve remover o loading quando estado global do loading é desligado', () => {
    setLoading(false);

    render(<Loading />);

    expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
  });
});
