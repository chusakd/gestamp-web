export class FileFlatNode {
    expandable: boolean = false;
    name: string = "";
    level: number = 0;
}

export class FileNode {
    name: string = "";
    children?: FileNode[];
}

export class FileModel {
    name: string = "";
    ext: string = "";
    path: string = "";
    type: string = "";
    base64String: string = "";
}

export class BatchModel {
    docNo: string = '';
    contractNo: string = '';
    effectiveDateStr: string = '';
    partyTaxId: string = '';
    name: string = '';
    expiredDateStr: string = '';
    actionType: string = '';
    sendFormType: string = '';
    instAmount: number = 0;
    dutyAmount: number = 0;
    dupDutyAmount: number = 0;
    totalDutyAmount: number = 0;
    totalAmount: number = 0;
    fineAmount: number = 0;
    fineAmountStr: string = '';
    surchargeAmount: number = 0;
    transAmount: number = 0;
    lastEffectiveDateStr: string = '';
    lastUpdateStr: string = '';
    createDatetimeStr: string = '';
    earliestDueDateStr: string = '';
    scheduleDateStr: string = '';
    files: string = '';
    batchId: number = 0;
    channel: number = 0;
    state: number = 0;
    nameEng: string = '';
    updateUser = '';
    remark: string = '';
    rejectReason: string = '';
    rejectMessage: string = '';
    status: string = '';
    payinSlipFilePath: string = '';
    qrPaymentFilePath: string = '';
    sumInstAmount: number = 0;
    documentAmount: number = 0;
    stampDutyAmount: number = 0;
    apiRefNo: string = '';
    totalSurcharge: number = 0;
    totalFine: number = 0;
    downloaded: boolean = false;
    totalPayment: number = 0;
    canSubmit: boolean = true;
    previousSubmit: string = '';
    alert: boolean = false;
}

export class BatchDetailModel {
    month: number = 0;
    year: number = 0;
    contract_no: string = "";
    inst_amount: number = 0;
    expiredDateFrom: Date = new Date();
    expiredDateTo: Date = new Date();
    batchId: number = 0;
    send_form_type: string = '';
    nameEng: string = '';
    status: string = '';
    updateUser = '';
}

// export class CsvModel {
//     id: string;
//     senderRole: string;
//     formType: string;
//     selectType: string;
//     typeCode: string;
//     contractNo: string;
//     userId: string;
//     registrationDate: string;
//     effectiveDate: string;
//     expireDate: string;
//     creditLimit: string;
//     taxPayer: string;
//     branchType: string;
//     relationship: string;
//     idNo: string;
//     firstName: string;
//     lastName: string;
//     partyBranchType: string;
//     address: string;
//     district: string;
//     province: string;
//     countryId: string;
//     totalParty: string;
//     detail1: string;
//     detail2: string;
//     detail3: string;
//     detail4: string;
//     date: string;
//     amount: string;
//     number: string;
//     actionType: string;
//     relatePartyId: string;
//     relatePartyName: string;
//     relatePartyBranchType: string;
//     relateContract: string;
//     relateContractName: string;
//     relateContractSurname: string;
//     relateContractBranchNo: string;
//     relateContractBranchType: string;
//     responsePaymentType: string;
//     dataDate: string;
//     productCode: string;
//     oldLimit: string;
//     type: string;
//     airpayUserId: string;
//     postCode: string;
//     subdistrict: string;
//     email: string;
// }

export class CsvErrorDetail {
    status: string = '';
    errorRowCount: number = 0;
    errorIndex: any;
}

// export class JobFilesModel {
//     id: number;
//     jobId: number;
//     filePath: string;
//     createDatetime: Date;
//     createDatetimeStr: string;
//     createUser: string;
//     isActive: string;
// }

export interface Element {
    jobId: any;
    channel: any;
    files: any;
    transAmount: any;
    createDatetimeStr: any;
    effectiveDateStr: any;
    lastEffectiveDateStr: any;
    status: any;
    lastUpdateStr: any;
    isEditing: any;
    submitStatus: any;
    submitMessage: any;
    filePath: any;
    submitDate: any;
    paymentDate: any;
    reqFileDate: any;
}

export class BatchViewPermission {
    batchViewRole: string[] = [];
    uploadRole: string[] = [];
    submitReviewRole: string[] = [];
    submitRole: string[] = [];
    scheduleSubmitRole: string[] = [];
    rejectRole: string[] = [];
    editTransactionRole: string[] = [];
    retryRole: string[] = [];
    deleteBatch: string[] = [];
}