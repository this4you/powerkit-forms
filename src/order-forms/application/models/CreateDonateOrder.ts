export type CreateDonateOrder = {
    productCode: string;
    name: string;
    sureName: string;
    phoneNumber: string;
    amount: number;
    instagram?: string;
    militaryNumber?: string;
    region?: string;
    postOffice?: string;
    additionalInfo?: string;
    file?: ApproveDocument;
};

export type ApproveDocument = {
    name: string;
    approveDocument: string;
}