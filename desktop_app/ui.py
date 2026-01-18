from PyQt5.QtWidgets import (
    QWidget, QPushButton, QFileDialog, QVBoxLayout,
    QHBoxLayout, QCheckBox, QTableWidget,
    QTableWidgetItem, QProgressBar
)
from workers.processor import process_folder


class HushHireApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("HushHire Desktop")
        self.setMinimumSize(900, 500)

        self.input_folder = None
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        # Folder selector
        folder_layout = QHBoxLayout()
        btn_input = QPushButton("Select Folder with PDFs")
        btn_input.clicked.connect(self.select_input)
        folder_layout.addWidget(btn_input)

        # Options
        self.partial = QCheckBox("Remove name & location bias")
        self.full = QCheckBox("Remove all bias (AI summary)")
        self.partial.setChecked(True)

        # Start
        start_btn = QPushButton("Start Processing")
        start_btn.clicked.connect(self.start)

        # Table
        self.table = QTableWidget(0, 3)
        self.table.setHorizontalHeaderLabels(
            ["File", "Type", "Status"]
        )

        # Progress
        self.progress = QProgressBar()

        layout.addLayout(folder_layout)
        layout.addWidget(self.partial)
        layout.addWidget(self.full)
        layout.addWidget(start_btn)
        layout.addWidget(self.table)
        layout.addWidget(self.progress)

        self.setLayout(layout)

    def select_input(self):
        self.input_folder = QFileDialog.getExistingDirectory(
            self, "Select Folder with PDFs"
        )

    def start(self):
        if not self.input_folder:
            return

        mode = "full" if self.full.isChecked() else "partial"

        process_folder(
            input_dir=self.input_folder,
            mode=mode,
            table=self.table,
            progress=self.progress,
        )
