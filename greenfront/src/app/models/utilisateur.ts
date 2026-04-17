export interface Utilisateur {
  id: string | number | null;
  nom: string;
  prenom: string;
  fullName?: string;
  email: string;
  username?: string;
  role?: string;
  roles?: string[];
  direction?: string | null;
}
