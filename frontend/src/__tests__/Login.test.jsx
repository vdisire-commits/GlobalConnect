import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../pages/auth/Login';
import authReducer from '../features/auth/authSlice';

const renderWithProviders = (component) => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
        },
    });

    return render(
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    );
};

describe('Login Component', () => {
    test('renders login form', () => {
        renderWithProviders(<Login />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
});
