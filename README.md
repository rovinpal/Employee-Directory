Employee Directory UI:
A responsive Employee Directory web UI built using HTML, CSS, and JavaScript, rendered using FreeMarker templates in Java.

Requirements:
- Java (JDK 8 or above)
- Freemarker (`freemarker-2.3.32.jar`)
- A browser to view the output

Run Steps:
1. Clone or download the project folder.
2. Navigate to the project directory:
   cd employee-ui
3. Compile the Java file using FreeMarker:
   javac -cp freemarker-2.3.32.jar EmployeeRenderer.java
4. Run the program to generate the HTML:
   java -cp .;freemarker-2.3.32.jar EmployeeRenderer(Use : instead of ; on macOS/Linux)
5. This will generate the output/index.html file
6. Copy css/ and js/ folders into the output/ folder
7. Open output/index.html in your browser


Project Structure:
employee-ui/
├── templates/
│   ├── index.ftl         ← Main UI template (Freemarker)
│   └── data.ftl          ← Employee data
├── css/
│   └── styles.css        ← Responsive styling
├── js/
│   └── app.js            ← UI interactivity
├── EmployeeRenderer.java ← Java generator using FreeMarker
├── freemarker-2.3.32.jar ← FreeMarker template engine (jar)
└── output/
    └── index.html        ← Final rendered HTML

Overview:
  The project features:
    A header with a title, search input, and filters
    Employee listing using card layout
    Add/Edit/Delete employee functionality
    Responsive UI for desktop and mobile
    Footer
    All employee interactivity is handled using vanilla JavaScript and stored in memory during the session

Challenges Faced:
  I was new to FreeMarker and Java-based templating, so setting up the rendering pipeline was a steep learning curve 
  Understanding how to dynamically pass data from Java into the HTML template took some experimentation

What I’d Improve:
  Add form validation and better error messages
  UX improvements
  Allow persistent data saving


