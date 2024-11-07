import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element-panel',
  standalone: true,
  templateUrl: './element-panel.component.html',
  styleUrls: ['./element-panel.component.css'],
  imports: [CommonModule]
})
export class ElementPanelComponent {
  // Default data for tabs
  tabs = [
    { label: 'templates', key: 'template' },
    { label: 'Text Elements', key: 'text' },
    { label: 'Graphic Elements', key: 'graphic' },
    { label: 'Images', key: 'image' }
  ];

  // Template elements with type added
  templateElements = [
    {
      name: 'Template 1',
      html: '<div class="template-1">This is Template 1</div>',
      css: '.template-1 { padding: 10px; border: 1px solid #ccc; background-color: #f8f9fa; }',
      type: 'template'
    },
    {
      name: 'Template 2',
      html: '<h2 class="template-2">This is Template 2</h2>',
      css: '.template-2 { color: blue; font-size: 24px; }',
      type: 'template'
    },
    {
      name: 'Template 3',
      html: '<div class="box1"></div>',
      css: '.box1 { height: 50px; width: 50px; background-color: red; }',
      type: 'template'
    },
    {
      name: 'Template 4',
      html: '<div class="recttop"></div><div class="recttop2"></div><div class="recttop3"></div><div class="recttop4"></div>',
      css: '.recttop { transform: skew(35deg, 121deg); z-index: 2; top: 4.3mm; left: 150mm; width: 57.13mm; height: 33.5mm; background: rgb(239, 28, 37); }',
      type: 'template'
    }
  ];

  // Default data for text elements
  textElements = [
    { type: 'text', tag: 'h1', label: 'H1' },
    { type: 'text', tag: 'h2', label: 'H2' },
    { type: 'text', tag: 'h3', label: 'H3' },
    { type: 'text', tag: 'h4', label: 'H4' },
    { type: 'text', tag: 'h5', label: 'H5' },
    { type: 'text', tag: 'h6', label: 'H6' },
    { type: 'text', tag: 'p', label: 'Paragraph' },
    { type: 'text', tag: 'div', label: 'Div' },
    { type: 'text', tag: 'ul', label: 'Unordered List' },
    { type: 'text', tag: 'ol', label: 'Ordered List' }
  ];

  // Default data for graphic elements
  graphicElements = [
    { type: 'graphic', tag: 'div', shape: 'circle', className: 'circle', label: 'Circle' },
    { type: 'graphic', tag: 'div', shape: 'square', className: 'square', label: 'Square' },
    { type: 'graphic', tag: 'div', shape: 'rectangle', className: 'rectangle', label: 'Rectangle' },
    { type: 'graphic', tag: 'div', shape: 'triangle', className: 'triangle', label: 'Triangle' },
    { type: 'graphic', tag: 'div', shape: 'star', className: 'star', label: 'Star' },
    { type: 'graphic', tag: 'div', shape: 'pentagon', className: 'pentagon', label: 'Pentagon' }
  ];

  // Default data for images
  imageElements = [
    { type: 'image', tag: 'img', src: 'https://via.placeholder.com/100', label: 'Image 1' },
    { type: 'image', tag: 'img', src: 'https://via.placeholder.com/100', label: 'Image 2' },
    { type: 'image', tag: 'img', src: 'https://via.placeholder.com/100', label: 'Image 3' }
  ];

  // Tracks the currently active tab
  activeTabIndex = 0;

  @Output() elementSelected: EventEmitter<any> = new EventEmitter<any>();

  // Method to change tabs
  selectTab(index: number) {
    this.activeTabIndex = index;
  }

  // Handle element click
  onElementClick(element: any) {
    // Check if the element type is non-editable
    const nonEditableTypes = ['template', 'graphic', 'image'];
    if (nonEditableTypes.includes(element.type)) {
      this.elementSelected.emit({ ...element, editable: false }); // Emit the selected element with non-editable status
    } else {
      this.elementSelected.emit({ ...element, editable: true }); // Emit editable elements
    }
  }
}
