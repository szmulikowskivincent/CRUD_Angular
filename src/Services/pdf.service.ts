import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})

export class PdfService {
  
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
  }

  async getTextFromPdf(url: string): Promise<string> {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const textContent = await this.extractText(pdf);
    return textContent;
  }

  private async extractText(pdf: any): Promise<string> {
    let textContent = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const pageText = await page.getTextContent();
      textContent += pageText.items.map((item: any) => item.str + ' ').join('');
    }
    return textContent;
  }
}

