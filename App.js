import { StyleSheet } from "react-native"
import HomeScreen from "./src/screens/Home"
import AppNavigation from "./src/navigation/AppNavigation"
import { AuthProvider } from "./src/AuthProvider"

export default function App() {
    return (
        <AuthProvider>
            <AppNavigation />
        </AuthProvider>
    )
}
