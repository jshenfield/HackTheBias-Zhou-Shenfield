import os
from PyQt5.QtWidgets import QTableWidgetItem

from services.pdf_reader import extract_text
from services.resume_classifier import is_resume
from services.bias_remover import remove_bias
from services.formatter import save_output


def process_folder(input_dir, mode, table, progress):
    output_dir = os.path.join(input_dir, "hushhire_output")
    os.makedirs(output_dir, exist_ok=True)

    pdfs = [
        f for f in os.listdir(input_dir)
        if f.lower().endswith(".pdf")
    ]

    total = len(pdfs)
    table.setRowCount(0)

    for i, pdf in enumerate(pdfs):
        row = table.rowCount()
        table.insertRow(row)
        table.setItem(row, 0, QTableWidgetItem(pdf))

        text = extract_text(os.path.join(input_dir, pdf))

        if not is_resume(text):
            table.setItem(row, 1, QTableWidgetItem("Noise"))
            table.setItem(row, 2, QTableWidgetItem("Skipped"))
        else:
            table.setItem(row, 1, QTableWidgetItem("Resume"))
            result = remove_bias(text, mode)
            save_output(result, pdf, output_dir)
            table.setItem(row, 2, QTableWidgetItem("Processed"))

        progress.setValue(int((i + 1) / total * 100))
