import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BookRecordModel, SchoolRecordModel, StudentModel} from "../../models/user.model";
import {AuthService} from "../../providers/authService";

/**
 * Generated class for the RecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-records',
  templateUrl: 'records.html',
})
export class RecordsPage {
  student: StudentModel;
  schoolRecords: Array<SchoolRecordModel>;
  bookRecords: Array<BookRecordModel>;
  bookRecord: BookRecordModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {

    let data = this.navParams.get('student');
    if (data != null) {
        this.student = JSON.parse(data);
        this.getRecords(this.student.id);
        console.log(this.student.id);
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RecordsPage');
  }

    getRecords(id: number) {
        this.authService.getRecords(id)
            .then((data) => this.handleRecords(data))
            .catch(e => console.log("get profile records error", e));
    }

    handleRecords(data) {
        this.schoolRecords = JSON.parse(data.schoolRecords);
        this.bookRecords = [];
        let tmp = JSON.parse(data.bookRecords);
        for (let key in tmp) {
            this.bookRecord = tmp[key][0];
            this.bookRecord.bookname = tmp[key].bookname;
            this.bookRecord.bookimage = tmp[key].bookimage;
            this.bookRecords.push(this.bookRecord);
        }
        //console.log(tmp);
        console.log(this.bookRecords);
    }

}
