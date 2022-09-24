export interface User{
    userId:string;
    username:string,
    password:string;
    active:boolean;
    appRoles :Role[]
}
export interface Role{
    roleId:number;
    roleName:string;
    description:string;
}
