import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <p className="text-xl font-bold">Please log in or register</p>
      <Button asChild className="mt-4">
        <a href="/api/login">Login</a>
      </Button>
      <Button asChild className="mt-4">
        <a href="/api/register">Register</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
    const data =await queryClient.fetchQuery(userQueryOptions)
    return data
    } catch (error) {
      
      return {user: null};
    }
  },
  component: Component,
});