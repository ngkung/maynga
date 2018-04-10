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
export class SchoolRecordModel {
  public id: number;
  public reasontoleave: string;
  public rfid: number;
  public school: string;
  public studentId: number;
  public timeofrecord: string;
  public typeofrecord: string;
}
export class BookRecordModel {
  public id: number;
  public rfid: number;
  public school: string;
  public bookId: number;
  public studentId: number;
  public dateofborrow: string;
  public dateofreturn: string;
  public dateoftraget: string;
  public bookname: string;
  public bookimage: string;
}