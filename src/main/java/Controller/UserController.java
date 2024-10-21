package Controller;

import Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";  // Return the registration form
    }

    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String email, @RequestParam String password, Model model) throws Exception {
        if (userService.getUserByEmail(email) != null) {
            model.addAttribute("error", "Username already taken");
            return "register";
        }
        userService.registerUser(name, email, password);
        return "redirect:/login";  // Redirect to login after successful registration
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";  // Return the login form
    }

    @GetMapping("/profile")
    public String homePage() {
        return "profile";  // Home page after successful login
    }
}