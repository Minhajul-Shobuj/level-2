export type Guardian = {
  fatherName: string;
  fatherContact: string;
  fatherOccupation: string;
  motherName: string;
  motherContact: string;
  motherOccupation: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  address: string;
  contactNo: string;
};

export type Student = {
  id: number;
  name: UserName;
  gender: "Male" | "Female";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "Ab+" | "Ab-";
  guardian: Guardian;
  presentAddress: string;
  permanentAddress: string;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
};
