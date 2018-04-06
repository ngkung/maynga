export class UserModel {
 
  public name: string;
  public email: string;
  public password: string;
  public confirm_password?: string;
  public students: Array<StudentModel>;
}
export class StudentModel {
  public name: string;
  public chiname: string;
  public school: string;
  public id: number;
  public photo: string;
  public status: string;
  public cur_class: string;
}
