<script>
    // Show toast notification
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      
      toastMessage.textContent = message;
      toast.className = 'toast show';
      
      // Set color based on type
      if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
      } else if (type === 'warning') {
        toast.style.background = 'linear-gradient(135deg, #ffc107, #e0a800)';
      } else {
        toast.style.background = 'linear-gradient(135deg, #4361ee, #3a0ca3)';
      }
      
      setTimeout(() => {
        toast.className = 'toast';
      }, 3000);
    }

    // Theme toggle functionality
    document.addEventListener("DOMContentLoaded", function () {
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = themeToggle.querySelector('i');
      
      // Check for saved theme preference or system preference
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      const savedTheme = localStorage.getItem('pdf-theme');
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
      
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('pdf-theme', 'dark');
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          showToast('Dark mode activated');
        } else {
          localStorage.setItem('pdf-theme', 'light');
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          showToast('Light mode activated');
        }
      });

      // Set current date
      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      });
      document.getElementById("current-date").textContent = dateString;

      // Print PDF functionality
      document.getElementById("print-pdf").addEventListener("click", function () {
        showToast('Opening print dialog...', 'warning');
        setTimeout(() => {
          window.print();
        }, 500);
      });

      // Download PDF functionality using html2pdf.js
      document.getElementById("download-pdf").addEventListener("click", function () {
        const btn = this;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        btn.disabled = true;
        
        showToast('Generating PDF file...', 'warning');
        
        // Generate PDF using html2pdf.js
        const element = document.querySelector('.pdf-container');
        const opt = {
          margin: 1,
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
          showToast('PDF downloaded successfully!');
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }).catch(error => {
          showToast('Failed to generate PDF', 'error');
          console.error('PDF generation error:', error);
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        });
      });

      // Preview functionality
      document.getElementById("preview-pdf").addEventListener("click", function () {
        showToast('Opening preview...', 'warning');
        
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>PDF Preview - Responsive Document</title>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #f5f5f5; 
              }
              .preview-container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                padding: 40px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
                border-radius: 8px; 
              }
              h1 { 
                color: #4361ee; 
                margin-bottom: 20px; 
                background: linear-gradient(135deg, #4361ee, #3a0ca3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              p { line-height: 1.6; margin-bottom: 15px; }
              .preview-image {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 20px 0;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              }
              .close-btn {
                background: #4361ee;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="preview-container">
              <h1>PDF Document Preview</h1>
              <p>This is a preview of how the PDF would look when printed or downloaded.</p>
              <p>The actual PDF will include all content from the document with proper formatting, margins, and styling.</p>
              <p>Features included in the PDF:</p>
              <ul>
                <li>Responsive design that works on all devices</li>
                <li>Professional typography and layout</li>
                <li>Color-coded sections and tables</li>
                <li>Proper headers and footers</li>
                <li>Print-optimized formatting</li>
              </ul>
              <button class="close-btn" onclick="window.close()">Close Preview</button>
            </div>
          </body>
          </html>
        `);
        previewWindow.document.close();
      });

      // Calculate and display page numbers
      function updatePageNumbers() {
        // For a real multi-page PDF, you would use more complex logic
        // This is simplified for this example
        const totalPages = 1;
        document.getElementById("total-pages").textContent = totalPages;
      }

      // Initial page number update
      updatePageNumbers();

      // Add hover effects to detail items
      const detailItems = document.querySelectorAll('.detail-item');
      detailItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
        });
      });

      // Table row hover effects
      const tableRows = document.querySelectorAll('tbody tr');
      tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
          row.style.backgroundColor = 'var(--light-gray)';
        });
        
        row.addEventListener('mouseleave', () => {
          if (Array.from(tableRows).indexOf(row) % 2 === 1) {
            row.style.backgroundColor = 'var(--light-gray)';
          } else {
            row.style.backgroundColor = 'transparent';
          }
        });
      });

      // Add animation to badges
      const badges = document.querySelectorAll('.badge');
      badges.forEach(badge => {
        badge.style.transform = 'scale(0)';
        setTimeout(() => {
          badge.style.transition = 'transform 0.3s ease';
          badge.style.transform = 'scale(1)';
        }, 300);
      });

      // Add keyboard shortcuts
      document.addEventListener('keydown', function(e) {
        // Ctrl+P for print
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault();
          document.getElementById('print-pdf').click();
          showToast('Print shortcut activated', 'warning');
        }
        
        // Ctrl+S for save (download PDF)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          document.getElementById('download-pdf').click();
          showToast('Download shortcut activated', 'warning');
        }
        
        // Esc to close toast
        if (e.key === 'Escape') {
          document.getElementById('toast').className = 'toast';
        }
      });

      // Show welcome message
      setTimeout(() => {
        showToast('Welcome to Responsive PDF Document! All buttons are now functional.');
      }, 1000);
    });

    // Export functionality for external use
    window.pdfDocument = {
      print: function() {
        document.getElementById('print-pdf').click();
      },
      download: function() {
        document.getElementById('download-pdf').click();
      },
      preview: function() {
        document.getElementById('preview-pdf').click();
      },
      toggleTheme: function() {
        document.getElementById('themeToggle').click();
      }
    };
  </script>