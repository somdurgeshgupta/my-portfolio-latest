import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      const email = f.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post("https://formspree.io/f/xdoyyqyr",
        { name: email.name, subject: email.subject, replyto: email.email, message: email.message },
        { 'headers': headers }).subscribe(
          response => {
            alert("Thanks Your Form Has been Submitted");
            console.log(response);
            f.resetForm(); 
          }
          
        );
    }
  }
}
