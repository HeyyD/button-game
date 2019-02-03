package com.heyyd.buttongame.server;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    @RequestMapping("/")
    public String test() {
        return "SERVER IS WORKING!\n";
    }

}
