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

enum Ccf {
    A = 'A',
    B = 'B',
    C = 'C',
}

interface Additional {
    key: string;
    value: string;
}

enum Status {
    Approve = 'approve',
    NotSubmit = 'notSubmit',
    Reject = 'reject',
    Review = 'review',
}

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