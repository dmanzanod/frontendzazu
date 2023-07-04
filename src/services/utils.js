import jsPDF from "jspdf";
import  { toJpeg, toPng } from 'html-to-image'


async function createPdf({
    doc,
    elements,
  }) {
    let top = 20;
    const padding = 10;
  console.log(elements)
    for (let i = 0; i < elements.length; i++) {
      console.log('actualElement',elements[i])
      if(elements[i]!==null){
        const el = elements[i] ;
      //const imgData = await toPng(el,{ pixelRatio: 2 });
      
      let elHeight = el.elHeight;
      let elWidth = el.elWidth;
       
      const pageWidth = doc.internal.pageSize.getWidth();
      console.log({elHeight,elWidth,pageWidth})
      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding;
        elWidth = elWidth * ratio - padding;
      }
  
      const pageHeight = doc.internal.pageSize.getHeight();
  
      if (top + elHeight > pageHeight) {
        doc.addPage();
        top = 20;
      }
  
      doc.addImage(el.img, "PNG", padding, top, elWidth, elHeight, `image${i}`);
      top += elHeight;}
    }
  }
  
  export async function exportMultipleChartsToPdf(elements) {
    const doc = new jsPDF("p", "px"); // (1)
  
     // (2)
  
    await createPdf({ doc, elements }); // (3-5)
  
    doc.save(`charts.pdf`); // (6)
  }