import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnChanges {
  @Input() data: any = { background: [], content: [] }; // Ensure data has default structure
  @Input() config: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['config']) {
      this.render();
    }
  }

  render() {
    const backgroundContainer = this.el.nativeElement.querySelector('.socialpost-background');
    backgroundContainer.innerHTML = ''; // Clear previous background content

    // Render background elements
    this.data.background.forEach((item: { imgSrc?: string; html?: string; position?: { left: string; top: string } }) => {
      const backgroundElement = this.renderer.createElement('div');
      this.renderer.setStyle(backgroundElement, 'left', item.position?.left || '0px');
      this.renderer.setStyle(backgroundElement, 'top', item.position?.top || '0px');

      if (item.imgSrc) {
        const imgElement = this.renderer.createElement('img');
        this.renderer.setAttribute(imgElement, 'src', item.imgSrc);
        this.renderer.setStyle(imgElement, 'width', '1024px');
        this.renderer.setStyle(imgElement, 'height', '1024px');
        this.renderer.setStyle(imgElement, 'object-fit', 'cover');
        this.renderer.appendChild(backgroundElement, imgElement);
      } else if (item.html) {
        const htmlElement = this.renderer.createElement('div');
        this.renderer.setProperty(htmlElement, 'innerHTML', item.html);
        this.renderer.appendChild(backgroundElement, htmlElement);
      }

      this.renderer.appendChild(backgroundContainer, backgroundElement);
    });

    const contentContainer = this.el.nativeElement.querySelector('.content-wrapper');
    contentContainer.innerHTML = ''; // Clear previous content elements

    this.data.content.forEach((item: { element: string; data: any; position: { left: any; top: any; }; className: string; }) => {
      const contentElement = this.renderer.createElement(item.element);
      this.renderer.setProperty(contentElement, 'innerHTML', item.data);
      
      // Set position styles
      this.renderer.setStyle(contentElement, 'position', 'absolute');
      this.renderer.setStyle(contentElement, 'left', item.position.left);
      this.renderer.setStyle(contentElement, 'top', item.position.top);
      if (item.className) {
        this.renderer.addClass(contentElement, item.className);
      }

      // Set contenteditable and overflow properties
      this.renderer.setAttribute(contentElement, 'contenteditable', 'true'); // Allow editing if needed
      // this.renderer.setStyle(contentElement, 'overflow', 'auto');

      // Update data on input change
      this.renderer.listen(contentElement, 'input', (event) => {
        const updatedData = (event.target as HTMLElement).innerHTML;
        item.data = updatedData; // Update directly on the item
      });

      this.renderer.appendChild(contentContainer, contentElement);
    });
  }

  // Method to add new elements to content
  addElement(element: any) {
    const newElement = {
      element: 'div', // Assuming all templates are wrapped in divs
      data: element.html || element.tag, // Using the HTML from the template
      position: { left: '100px', top: '0px' },
      className: '' // You can add any specific class if needed
    };

    // Inject the CSS style into the document
    this.injectCss(element.css);

    this.data.content.push(newElement); // Add the new element to the content
    this.render(); // Re-render to display the new content
  }

  // Method to inject CSS into the document
  private injectCss(css: string) {
    const style = this.renderer.createElement('style');
    this.renderer.setProperty(style, 'innerHTML', css);
    this.renderer.appendChild(this.el.nativeElement.ownerDocument.head, style);
  }
}
