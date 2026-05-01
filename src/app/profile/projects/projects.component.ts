import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  config: any;
  projects = [
    {
      id: 1,
      title: 'Monarch',
      desc: 'Crypto exchange platform project where I updated the Nuxt.js frontend, improved design and UI, and added user experience features.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      githurl: 'https://github.com/somdurgeshgupta/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/z1.png',
      tech: 'Nuxt.js, Frontend Engineering, UI/UX'
    },

    {
      id: 2,
      title: 'Axxya Nutritionist Pro',
      desc: 'Built a scalable nutrition platform with country-specific diet guidance and data support for the US and Canada.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      githurl: 'https://github.com/somdurgeshgupta/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/z26.png',
      tech: 'Node.js, MongoDB, Angular, Scalable Architecture'
    },


    {
      id: 3,
      title: 'Airtel I Deploy Dashboard',
      desc: 'Full-stack dashboard for Airtel to track project data, resource allocation, and cost management using real-time visual insights.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      githurl: 'https://github.com/somdurgeshgupta/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/z27.png',
      tech: 'Angular, Node.js, Dashboard Analytics, Data Visualization'
    },

    {
      id: 4,
      title: 'Zeatool and Zeamed',
      desc: 'Healthcare initiative focused on improving treatment quality and reducing operational cost through optimized service workflows.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      githurl: 'https://github.com/somdurgeshgupta/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/z23.png',
      tech: 'Angular, Node.js, Authentication, Healthcare Workflows'
    },


    {
      id: 5,
      title: 'Jewelex - Diamond Heaven',
      desc: 'Developed and deployed a MEAN stack e-commerce application with improved backend quality, optimized services, and AWS EC2 hosting.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      githurl: 'https://github.com/somdurgeshgupta/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/z4.png',
      tech: 'MEAN Stack, Node.js, Angular, AWS EC2'
    },

  ]
  constructor() { }

  ngOnInit() {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.projects.length
    };
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }
}
