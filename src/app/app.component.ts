import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ElementPanelComponent } from './element-panel/element-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewComponent, HttpClientModule, ElementPanelComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social post editor ';

  config = {
    'socialbackground': 'social-background',
    headingfirst: 'heading-first',
    'heading': 'heading',
    // Other configurations...
  };

  data: any = {
    backgroundUrl: 'http://192.168.10.37:8080/index.html',  // URL for dynamic background
    background: [
      {
        imgSrc: 'https://picsum.photos/100/100?random=3',
        position: { left: '0px', top: '0px' }
      }
    ],
    content: [
      { data: 'Learn,Explore,Grow', position: { left: '19px', top: '0px' }, element: 'div', className: this.config.headingfirst },
      { data: 'AI-Driven Learning Hub!', position: { left: '19px', top: '80px' }, element: 'h1', className: this.config.heading },
      { data: '<b>DIGITAL STUDY CENTER', position: { left: '19px', top: '324px' }, element: 'h2', className: 'sub-heading' },
      { data: 'Welcome to <b>SwayamGuru TechLok</b>, a premier study center powered by <b>MahaMissionEducation and Career Council</b>-an avant-garde NGO committed to sculpting bright futures. Ourmission is to create a dynamic learning environment where individuals can thrive, explore, and grow in the realm of cutting-edge technology.', position: { left: '19px', top: '367px' }, element: 'p', className: 'description' },
      { data: '', className: 'services-heading', element: 'div', position: { left: '19px', top: '915px' } },
      { data: '', className: 'contact-us', element: 'div', position: { left: '19px', top: '915px' } },
      { data: 'CONTACT US', className: 'contact', element: 'div', position: { left: '30px', top: '920px' } },
      { data: 'CONTACT US', className: 'Location', element: 'div', position: { left: '686px', top: '807px' } },
      { data: '', className: 'footer', element: 'div', position: { left: '0px', top: '980px' } },
      { data: 'www.mmeac.org', className: 'org-website', element: 'div', position: { left: '19px', top: '975px' } },
      { data: 'info@mmeac.org', className: 'org-email', element: 'div', position: { left: '200px', top: '975px' } },
      { data: '<h2><b>Maha Mission Education and Career Council</b><h2>', className: 'h2', element: 'div', position: { left: '450px', top: '995px' } },

    ]
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadExternalCSS('http://192.168.10.37:8080/CSS/style.css');
    this.loadExternalHTMLForBackground();
  }

  loadExternalHTMLForBackground() {
    // Use the backgroundUrl from the data object
    const url = this.data.backgroundUrl;
    if (url) {
      this.http.get(url, { responseType: 'text' }).subscribe(
        (data) => {
          // Clear the previous background
          this.data.background = [];

          // Add the new HTML as background content
          this.data.background.push({ html: data });

          // Trigger change detection to update the view
          this.data = { ...this.data };
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading external HTML for background:', error);

          // Restore the default background image if loading fails
          this.data.background = [
            {
              imgSrc: 'https://picsum.photos/100/100?random=3',
              position: { left: '0px', top: '0px' }
            }
          ];
        }
      );
    }
  }

  loadExternalCSS(filePath: string) {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = filePath;
    document.head.appendChild(linkElement);
  }
}
