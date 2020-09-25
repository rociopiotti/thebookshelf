export const RouteLinks = {
  common: [
    {
      icon: "home",
      text: "Home",
      link: "/",
    },
    {
      icon: "sign-in",
      text: "Log-in",
      link: "/login",
      restricted: true,
    },
  ],
  admin: [
    {
      icon: "home",
      text: "Admin",
      link: "/admin",
      dashboard: false,

    },
    {
      icon: "plus",
      text: "Add post",
      link: "/admin/posts/create",
      dashboard: true,
    },
    {
      icon: "clipboard",
      text: "My post",
      link: "/admin/posts",
      dashboard: true,
    },
    {
      icon: "cog",
      text: "Account settings",
      link: "/admin/account/settings",
      dashboard: true,
    },
    {
      icon: "sign-out",
      text: "Log-out",
      link: "/logout",
      dashboard: false,
    },
  ],
};
