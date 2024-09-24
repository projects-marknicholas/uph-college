import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Assets
import ExportSvg from "../../../assets/svg/export.svg";

const ExportButton = ({ targetRef }) => {

  const handleExportPDF = () => {
    const input = targetRef.current;

    // Use html2canvas to capture the HTML element as an image
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Add the image to the PDF
        const imgWidth = 190; // PDF width
        const pageHeight = 295; // PDF height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('document.pdf');
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  return (
    <button className="export" onClick={handleExportPDF}>
      <img src={ExportSvg} alt="Export" />
      Export
    </button>
  );
};

export default ExportButton;