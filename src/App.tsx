import { CssBaseline } from '@mui/material';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppTheme from './shared-theme/AppTheme';
import { AuthProvider } from './login/AuthProvider';
import { Pages } from './pages/Pages';

function App() {
    return (
        <AppTheme>
        <CssBaseline/>
        <AuthProvider>
            <div className={"App"}>
                <Pages />
            </div>
        </AuthProvider>
        </AppTheme>
    );
}

export default App;
