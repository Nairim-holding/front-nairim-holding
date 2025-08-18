export default interface User {
    id: number;
    name: string;
    email: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    password:string;
    birth_date: string;
    role: string;
    updated_at:string;
    created_at: string;
}