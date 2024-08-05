export type CreateReceptionPoint = {
    name: string;
    phoneNumber: string;
    address: string;
    description: string;
    file: ApproveDocument;
};

export type ApproveDocument = {
    name: string;
    approveDocument: string;
}