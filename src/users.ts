export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "u_ada",
    email: "ada@example.com",
    name: "Ada Lovelace",
    password: "analytical",
    createdAt: "2024-03-10T04:30:00.000Z",
  },
  {
    id: "u_grace",
    email: "grace@example.com",
    name: "Grace Hopper",
    password: "compiler",
    createdAt: "2024-06-15T16:00:00.000Z",
  },
  {
    id: "u_alan",
    email: "alan@example.com",
    name: "Alan Turing",
    password: "machine",
    createdAt: "2024-01-05T12:00:00.000Z",
  },
  {
    id: "u_katherine",
    email: "katherine@example.com",
    name: "Katherine Johnson",
    password: "orbit",
    createdAt: "2023-11-20T18:45:00.000Z",
  },
  {
    id: "u_plus",
    email: "ada+lovelace@example.com",
    name: "Ada Tag",
    password: "analytical",
    createdAt: "2024-07-01T15:00:00.000Z",
  },
];

export function publicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}
