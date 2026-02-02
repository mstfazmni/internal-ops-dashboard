import { Header } from "./Header";

// Layout component that includes the Header and a main content area
export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}