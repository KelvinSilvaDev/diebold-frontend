import '@fortawesome/fontawesome-free/css/all.min.css'
import './globals.css'
import { ReduxProvider } from '@/redux/provider'
import AppLayout from './components/AppLayout'
// import "bootstrap/dist/css/bootstrap.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body id="app">
        <ReduxProvider>
          <AppLayout>{children}</AppLayout>
        </ReduxProvider>
      </body>
    </html>
  )
}
