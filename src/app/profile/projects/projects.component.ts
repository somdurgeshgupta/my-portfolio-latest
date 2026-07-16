import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent implements OnInit {
  config: any;
  projects = [
    {
      id: 1,
      title: 'Arc Market Application',
      desc: 'An evidence-led market analysis workspace with instrument watchlists, interactive price charts, technical signals, decision levels, and historical outcome insights.',
      livedemo: 'https://arc-market-application.vercel.app/',
      mediumlink: '',
      imgUrl: 'assets/images/arc-market.png',
      tech: 'Angular, TypeScript, Market Analytics, Data Visualization'
    },
    {
      id: 2,
      title: 'Cerberus Ecommerce Application',
      desc: 'A modern lifestyle e-commerce experience featuring curated collections, product discovery, account flows, and a refined responsive storefront.',
      livedemo: 'https://project-cerberus-seven.vercel.app/',
      mediumlink: '',
      imgUrl: 'assets/images/cerberus-ecommerce.png',
      tech: 'Angular, TypeScript, Responsive UI, E-commerce UX'
    },
    {
      id: 3,
      title: 'Franchisee Club',
      desc: 'A fractional franchise marketplace where users can analyze opportunities and buy or sell shares in franchise businesses for as little as $10 per share.',
      livedemo: 'https://www.franchiseeclub.com/',
      mediumlink: '',
      imgUrl: 'assets/images/franchisee-club.png',
      tech: 'Angular 18/20, Node.js, MongoDB, Docker, CI/CD'
    },
    {
      id: 4,
      title: 'Nutritionist Pro by Axxya',
      desc: 'A professional nutrition platform for food-label creation, diet analysis, recipe calculations, and menu planning, with compliance support across the USA, Canada, EU/UK, and China/Hong Kong.',
      livedemo: 'https://nutritionistpro.com/',
      mediumlink: '',
      imgUrl: 'assets/images/nutritionist-pro.png',
      tech: 'Angular, Node.js, MongoDB, Nutrition Analysis Workflows'
    },


    {
      id: 5,
      title: 'Airtel I Deploy Dashboard',
      desc: 'Full-stack dashboard for Airtel to track project data, resource allocation, and cost management using real-time visual insights.',
      livedemo: 'https://my-portfolio-latest-six.vercel.app/',
      mediumlink: 'https://my-portfolio-latest-six.vercel.app/',
      imgUrl: 'assets/images/airtel-ideploy.png',
      tech: 'Angular, Node.js, Dashboard Analytics, Data Visualization'
    },

    {
      id: 6,
      title: 'ZeaTool by ZeaHealth',
      desc: 'An end-to-end healthcare price-transparency platform that helps hospitals meet CMS requirements, publish machine-readable pricing, compare provider rates, and generate market insights from 3,500+ hospitals.',
      livedemo: 'https://zeatool.com/proLanding',
      mediumlink: '',
      imgUrl: 'assets/images/zeatool.png',
      tech: 'Angular, Node.js, MongoDB, REST APIs, Healthcare Data'
    },


    {
      id: 7,
      title: 'Zales Diamond Ring Builder',
      desc: 'A custom engagement-ring e-commerce experience that lets shoppers begin with a setting or loose diamond, then match the complementary component to design their ideal ring.',
      livedemo: 'https://diamonds.zales.com/',
      mediumlink: '',
      imgUrl: 'assets/images/zales-diamonds.png',
      tech: 'Angular, Node.js, Secure E-commerce APIs, AWS EC2'
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
