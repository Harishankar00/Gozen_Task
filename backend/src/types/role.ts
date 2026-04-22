export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export interface AuthenticatedUser {
  id: string;
  role: Role;
}
