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

interface Paper {
    DOI: string;
    title: string;
    firstAuthor: string[];
    secondAuthor: string[];
    thirdAuthor: string[];
    CCF: 'A' | 'B' | 'C';
    status: 'notSubmit' | 'review' | 'reject' | 'approve';
    recommend?: string;
    additional: {
        key: "correspondingAuthor" | "pageCount" | "conferenceOrPeriodical" | "acronym" | "publisher" | "fund" | "submitTime" | "receiptTime" | "publishTime" | "type";
        value: string;
    }[];
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