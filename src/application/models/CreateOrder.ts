export type CreateOrder = {
    name: string;
    sureName: string;
    email: string;
    instagram: string;
    phoneNumber: string;
    militaryNumber: string;
    region: string;
    postOffice: string;
    additionalInfo: string;
    file: ApproveDocument;
    productCode: string;
};

export type ApproveDocument = {
    name: string;
    approveDocument: string;
}