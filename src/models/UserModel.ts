interface UserModel {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  username: string;
  role_id: number;
}

export type { UserModel };
