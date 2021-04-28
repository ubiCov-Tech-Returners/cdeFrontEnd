
import { render, screen } from '@testing-library/react';
import BootstrapNavbar from './BootstrapNavbar';

test('renders Nav Bar correctly', () => {
    render(<BootstrapNavbar/>);
    const linkElement = screen.getByText(/Questions/i);
    expect(linkElement).toBeInTheDocument();
});