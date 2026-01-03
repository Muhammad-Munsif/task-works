 <script>
    document.addEventListener("DOMContentLoaded", function () {
      // Theme toggle functionality
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
        } else {
          localStorage.setItem('pdf-theme', 'light');
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
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
        window.print();
      });

      // Download PDF functionality (simulated)
      document.getElementById("download-pdf").addEventListener("click", function () {
        const btn = this;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        btn.disabled = true;
        
        // Simulate PDF generation
        setTimeout(() => {
          // In a real implementation, you would generate and download the PDF here
          // Using libraries like jsPDF, html2pdf.js, or pdf-lib
          
          alert("PDF generated! In a real implementation, this would download the PDF file.");
          
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }, 1500);
      });

      // Preview functionality
      document.getElementById("preview-pdf").addEventListener("click", function () {
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>PDF Preview</title>
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
              h1 { color: #4361ee; margin-bottom: 20px; }
              p { line-height: 1.6; margin-bottom: 15px; }
            </style>
          </head>
          <body>
            <div class="preview-container">
              <h1>PDF Preview</h1>
              <p>This is a preview of how the PDF would look when printed or downloaded.</p>
              <p>All content from the document is preserved with proper formatting.</p>
              <p>Click the print button in the main window to generate the actual PDF.</p>
            </div>
          </body>
          </html>
        `);
        previewWindow.document.close();
      });

      // Calculate and display page numbers (simplified)
      function updatePageNumbers() {
        // For a real multi-page PDF, you would use more complex logic
        // This is simplified for this example
        const totalPages = 1; // In real implementation, calculate based on content
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
    });

    // For a complete PDF generation solution, you could integrate:
    // 1. jsPDF + html2canvas: For client-side PDF generation
    // 2. Puppeteer: For server-side PDF generation
    // 3. pdf-lib: For manipulating existing PDFs
  </script>