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
      restricted: true
    },
  ],
  admin: [
    {
      icon: "sign-out",
      text: "Log-out",
      link: "/logout",
    },
    {
      icon: "home",
      text: "Admin",
      link: "/admin",
    },
    {
      icon: "clipboard",
      text: "My post",
      link: "/admin/posts",
    },
    {
      icon: "plus",
      text: "Add post",
      link: "/admin/posts/create",
    },
  ],
};
