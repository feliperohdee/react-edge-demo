import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/app/components/ui/button';

describe('@/app/components/ui/button', () => {
	it('should render', () => {
		render(<Button data-testid='button'>Click Me</Button>);

		expect(screen.getByTestId('button')).toBeDefined();
	});

	it('should call the onClick handler', () => {
		const onClick = vi.fn();
		render(
			<Button
				data-testid='button'
				onClick={onClick}
			>
				Click Me
			</Button>
		);

		fireEvent.click(screen.getByTestId('button'));

		expect(onClick).toHaveBeenCalled();
	});
});
