import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
export const printDocument = (props) => {
	// html2canvas(props.ref.current, { scale: 0.65 }).then((canvas) => {
	// 	const imgData = canvas.toDataURL("image/png");
	// 	const pdf = new jsPDF();
	// 	pdf.addImage(imgData, "JPEG", 0, 0);
	// 	pdf.save(props.name);
	// });
	htmlToImage
		.toPng(props.ref.current, { canvasWidth: 794 })
		.then(function (dataUrl) {
			const pdf = new jsPDF();
			pdf.addImage(dataUrl, "PNG", 0, 0);
			pdf.save(props.name);
		});
};
