import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './lib/auth-context'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Handle 404 redirect from GitHub Pages
if (sessionStorage.redirect) {
  let redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  // Navigate to the preserved path
  window.history.replaceState(null, '', redirect);
}

// Create a new router instance
const router = createRouter({
  routeTree,
  // Set base path for GitHub Pages subdirectory deployment
  basepath: '/web-wedding',
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

