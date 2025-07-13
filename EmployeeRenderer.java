import freemarker.template.*;
import java.util.*;
import java.io.*;

public class EmployeeRenderer {
    public static void main(String[] args) throws Exception {
        Configuration cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setDirectoryForTemplateLoading(new File("templates"));
        cfg.setDefaultEncoding("UTF-8");

        Template template = cfg.getTemplate("index.ftl");

        List<Map<String, String>> employees = Arrays.asList(
            Map.of("id", "1", "firstName", "Alice", "lastName", "Smith", "email", "alice@example.com", "department", "HR", "role", "Manager"),
            Map.of("id", "2", "firstName", "Bob", "lastName", "Brown", "email", "bob@example.com", "department", "Engineering", "role", "Developer"),
            Map.of("id", "3", "firstName", "Clara", "lastName", "Davis", "email", "clara@example.com", "department", "Finance", "role", "Analyst"),
            Map.of("id", "4", "firstName", "Daniel", "lastName", "Lee", "email", "daniel@example.com", "department", "Engineering", "role", "Tester")
        );

        Map<String, Object> dataModel = new HashMap<>();
        dataModel.put("employees", employees);

        File outDir = new File("output");
        if (!outDir.exists()) outDir.mkdir();

        try (Writer out = new FileWriter(new File(outDir, "index.html"))) {
            template.process(dataModel, out);
        }

        System.out.println("✔ index.html generated at /output/index.html");
    }
}
