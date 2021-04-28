
import { render, screen } from '@testing-library/react';
import BootstrapNavbar from './BootstrapNavbar';
import userEvent from "@testing-library/user-event";

test('renders Nav Bar correctly', () => {
    render(<BootstrapNavbar/>);
    const linkElement = screen.getByText(/Questions/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders Nav Bar dropdown when Questions link is clicked', () => {
    render(<BootstrapNavbar/>);
    const dropdownLink = screen.getByText('Questions');
    userEvent.click(dropdownLink);
    expect(screen.getByText('income',{exact:false})).toBeInTheDocument();
});

