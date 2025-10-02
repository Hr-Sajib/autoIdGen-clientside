export type TUser = {
	id: string;
	userId: string;
	name: string;
	email: string;
	role?: string;
	designation?: string;
};

export interface Student {
  batchCode: string
  roll: string
  name: string
  department: string
  bloodGroup: string
  dob: string
  phone: string
  status: "Complete" | "Pending"
}

export interface Project {
  _id: string;
  userId: string;
  projectName: string;
  templateId: string;
  institutionName: string;
  institutionLogoUrl: string;
  institutionSignUrl?: InstitutionSignUrl;
  cardType: "Student" | "Employee" | string;
  cardQuantity: number;
  address: string;
  contactPhone: string;
  batchId: number;
  additionalFields: string;
}

// {
//     "batchId" : 2621,
//     "serialOrRollNumber": 3,
//     "name": "Kelly 2",
//     "setBy": "owner",
//     "personalPhotoUrl": "https://i.postimg.cc/Y0ydK27n/person.jpg",
//     "additionalfieldValues":[
//         {
//             "fieldName": "Department",
//             "fieldValue": "CSE"
//         },
//         {
//             "fieldName": "Section",
//             "fieldValue": "C"
//         },
//         {
//             "fieldName": "Roll Number",
//             "fieldValue": "5"
//         },
//         {
//             "fieldName": "Blood Group",
//             "fieldValue": "B+"
//         },
//         {
//             "fieldName": "Phone",
//             "fieldValue": "+AAAA-XXXX-MMM"
//         }
//     ]
// }



// Card type from your API
// export interface Card {
//   _id: string;
//   batchId: number;
//   serialOrRollNumber: number;
//   name: string;
//   setBy: string;
//   personalPhotoUrl: string;
//   additionalFields: Array<{
//     fieldName: string;
//     fieldValue: string;
//   }>;
//   additionalfieldValues: Array<{
//     fieldName: string;
//     fieldValue: string;
//   }>;
//   cardImageUrl?: string;
//   status: string;
// }


export interface Card {
  _id?: string;
  batchId?: number;
  serialOrRollNumber?: number;
  name?: string;
  setBy?: string;
  personalPhotoUrl?: string;
 additionalFields?: Record<string, string>;
  additionalfieldValues?: Array<{
    fieldName?: string;
    fieldValue?: string;
    setBy?: string;
  }>;
  cardImageUrl?: string;
  status?: string;
}

// Optional extension for table rendering
export type CardRow = Card & {
  serialStr: string;
  name: string;
  // status: "";
  additionalFields: Record<string, string>;
};

interface InstitutionSignUrl {
  roleName: string;
  signUrl: string;
}