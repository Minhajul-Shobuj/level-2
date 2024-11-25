export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type User = {
  id: number;
  name: UserName;
  gender: "male" | "female" | "others";
  age: number;
  religion: string;
  currentAddress: string;
  permanentAddress: string;
  contactNo: string;
  profileImg?: string;
  eamil: string;
  isActive: "active" | "inActive";
};
