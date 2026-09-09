import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/site")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: function SiteGone() {
    return null;
  },
});
