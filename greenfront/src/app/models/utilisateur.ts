export interface Utilisateur {
  id: string | number | null;
  nom?: string | null;
  prenom?: string | null;
  fullName?: string | null;
  email?: string | null;
  username?: string | null;
  role?: string | null;
  roles?: string[];
  ministere?: number | null;
  ministereName?: string | null;
  direction?: string | null;
  directionName?: string | null;
  enable?: boolean;
  createdAt?: string | null;
}
