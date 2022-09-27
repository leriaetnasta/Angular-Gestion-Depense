export interface User{
     userId: string;
     firstName: string;
     lastName: string;
     username: string;
     email: string;
     lastLoginDate: Date;
     lastLoginDateDisplay: Date;
     joinDate: Date;
     profileImageUrl: string;
     active: boolean;
     notLocked: boolean;
     role: string;
     authorities: [];
}

