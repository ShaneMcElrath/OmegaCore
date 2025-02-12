
let file: File | null = null

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("logButton");
  const fileInput = document.getElementById("fileInput");
  if(!button || !fileInput) return 

  button.addEventListener("click", () => {
    fileInput.click();
  });

  // When a file is selected, log its name
  fileInput.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (!(result instanceof ArrayBuffer)) return;

        const data = new Uint8Array(result);
        const workbook = window.XLSX.read(data, { type: "array" });

        // Assuming the first sheet is the one we need
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to an array of objects
        const jsonData: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet);

        console.log("Parsed Data:", jsonData); // Array of objects
    };

    reader.readAsArrayBuffer(file);
});
});


