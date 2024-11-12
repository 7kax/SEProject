interface AuthUser {
    id: string;         // student number or staff number
    token: string;      // JWT token
    isAdmin: boolean;
}

interface UserInfo {
    id: string;         // student number or staff number
    name: string;       // full name
    email: string;      // email
    phone: string;      // phone number
    address: string;    // address
}

type Ccf = 'A' | 'B' | 'C';

interface Additional {
    key: string;
    value: string;
}

type Status = 'notSubmit' | 'review' | 'reject' | 'approve';

interface Paper {
    DOI: string;
    title: string;
    firstAuthor: string[];
    secondAuthor: string[];
    thirdAuthor: string[];
    CCF: Ccf;
    status: Status;
    recommend?: string;
    additional: Additional[];
    url?: string;
}

interface ClaimInfo {
    id: string;
    doi: string;
}

interface DeleteInfo {
    id: string;
    doi: string;
}

interface AuthInfo {
    id: string;
    password: string;
    isAdmin: boolean;
}