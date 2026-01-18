import sys
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import Qt
from ui import HushHireApp

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = HushHireApp()
    window.show()
    sys.exit(app.exec_())
