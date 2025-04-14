// utils/generateWordDocument.js
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

// Helper: üres sor
const emptyLine = () => new Paragraph({ text: " " });

export const generateWordDocument = async (formData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Kutya nyilvántartási adatlap",
            heading: HeadingLevel.TITLE,
            spacing: { after: 400 },
          }),

          // Tulajdonos adatai
          new Paragraph({
            text: "Tulajdonos adatai",
            heading: HeadingLevel.HEADING_1,
          }),
          paragraphText("Név", formData.tulajdonosNeve),
          paragraphText("Cím", formData.tulajdonosCim),
          paragraphText("Telefon", formData.tulajdonosTel),
          paragraphText("Email", formData.tulajdonosEmail),
          emptyLine(),

          // Kutya adatai
          new Paragraph({
            text: "Kutya adatai",
            heading: HeadingLevel.HEADING_1,
          }),
          paragraphText("Hívónév", formData.ebHivoneve),
          paragraphText("Törzskönyvi név", formData.ebTorzkonyviNeve),
          paragraphText("Fajta", formData.ebFajtaja),
          paragraphText("Nem", formData.ebNeme),
          paragraphText("Születési idő", formatDate(formData.ebSzulIdeje)),
          paragraphText("Szín", formData.ebSzine),
          paragraphText("Chip sorszám", formData.chipSorszam),
          emptyLine(),

          // Orvosi adatok
          new Paragraph({
            text: "Orvosi adatok",
            heading: HeadingLevel.HEADING_1,
          }),
          paragraphText("Ivartalanítás időpontja", formatDate(formData.ivartalanitasIdo)),
          paragraphText("Oltási időpont", formatDate(formData.oltasiIdo)),
          paragraphText("Orvosi bélyegző szám", formData.orvosiBelyegzoSzam),
          paragraphText("Oltási könyv szám", formData.oltasiKonyvSzam),
          paragraphText("Oltási bélyegző szám", formData.oltasiBelyegzoSzam),
          emptyLine(),

          // Egyéb
          new Paragraph({
            text: "Beküldés dátuma: " + formatDate(formData.bekuldesDatuma),
            spacing: { before: 400 },
          }),
          new Paragraph({
            text: "Státusz: " + (formData.status === "elfogadva" ? "Elfogadva" : "Feldolgozás alatt"),
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `kutya_adatlap_${formData.ebHivoneve || "ismeretlen"}.docx`);
};

// Segédfüggvények
const paragraphText = (label, value) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun({ text: value || "Nincs megadva" }),
    ],
  });

const formatDate = (dateStr) => {
  if (!dateStr) return "Nincs megadva";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
};
